import test from 'node:test';
import assert from 'node:assert/strict';
import { callTool, createPlantState, handleRpc, PROTOCOL_VERSION, TOOL_DEFINITIONS } from '../server.mjs';

test('MCP initialization negotiates the required protocol and advertises tools', () => {
  const initialized = handleRpc(createPlantState(), { jsonrpc: '2.0', id: 1, method: 'initialize', params: { protocolVersion: PROTOCOL_VERSION } });
  assert.equal(initialized.result.protocolVersion, '2025-11-25');
  assert.ok(initialized.result.capabilities.tools);
  const listed = handleRpc(createPlantState(), { jsonrpc: '2.0', id: 2, method: 'tools/list' });
  assert.equal(listed.result.tools.length, TOOL_DEFINITIONS.length);
  assert.ok(listed.result.tools.some((tool) => tool.name === 'confirm_demo_action'));
});

test('line diagnostics return threshold, trend, evidence, and a bounded recommendation', () => {
  const answer = callTool(createPlantState(), 'get_line_diagnostics', { lineId: 2 });
  assert.equal(answer.structuredContent.assessment.severity, 'watch');
  assert.equal(answer.structuredContent.sensors[0].value, 4.8);
  assert.equal(answer.structuredContent.sensors[0].watchThreshold, 4.5);
  assert.match(answer.structuredContent.evidence.join(' '), /Vibration sensor/);
  assert.match(answer.structuredContent.dataNotice, /not a predictive-maintenance diagnosis/);
});

test('write-like demo actions require a fresh preview and explicit confirmation', () => {
  const state = createPlantState();
  const preview = callTool(state, 'prepare_demo_action', { action: 'create_work_order', lineId: 2, issue: 'Inspect bearing' }, 1_000);
  assert.equal(state.tickets.length, 0);
  const denied = callTool(state, 'confirm_demo_action', { actionId: preview.structuredContent.actionId, confirmed: false }, 1_001);
  assert.equal(denied.isError, true);
  assert.equal(state.tickets.length, 0);
  const applied = callTool(state, 'confirm_demo_action', { actionId: preview.structuredContent.actionId, confirmed: true }, 1_002);
  assert.equal(applied.structuredContent.status, 'DRAFT_CREATED');
  assert.equal(applied.structuredContent.ticket.issue, 'Inspect bearing');
  assert.equal(state.tickets.length, 1);
  const replay = callTool(state, 'confirm_demo_action', { actionId: preview.structuredContent.actionId, confirmed: true }, 1_003);
  assert.equal(replay.isError, true);
  const expiredPreview = callTool(state, 'prepare_demo_action', { action: 'pause_line', lineId: 2 }, 2_000);
  const expired = callTool(state, 'confirm_demo_action', { actionId: expiredPreview.structuredContent.actionId, confirmed: true }, 302_001);
  assert.equal(expired.isError, true);
  assert.equal(state.paused.has(2), false);
});

test('unknown tool and invalid line are returned as tool errors', () => {
  assert.equal(callTool(createPlantState(), 'missing').isError, true);
  assert.equal(callTool(createPlantState(), 'get_line_diagnostics', { lineId: 99 }).isError, true);
});

test('MCP JSON-RPC dispatch handles notifications without a response body', () => {
  assert.equal(handleRpc(createPlantState(), { jsonrpc: '2.0', method: 'notifications/initialized' }), null);
  assert.equal(handleRpc(createPlantState(), { jsonrpc: '2.0', id: 3, method: 'not/a/method' }).error.code, -32601);
});
