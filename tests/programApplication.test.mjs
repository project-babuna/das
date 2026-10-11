import test from 'node:test';
import assert from 'node:assert/strict';
import { applicationCategory, applicationPrograms, applicationStages, validateProgramApplication, formatProgramApplication } from '../lib/programApplication.mjs';
const valid = { program: 'incubation', stage: applicationStages[0], business: '', problem: 'Small retailers lose track of stock.', progress: 'Interviewed five local shop owners.', support: 'Testing a first version.' };
test('all three selective programs produce identifiable applications', () => {
  for (const [program, title] of Object.entries(applicationPrograms)) {
    const { data, error } = validateProgramApplication({ ...valid, program });
    assert.equal(error, undefined);
    assert.match(formatProgramApplication(data), new RegExp(`Program: ${title}`));
    assert.ok(formatProgramApplication(data).includes(valid.progress));
  }
});
test('rejects unsupported programs, stages, empty answers and non-string input', () => {
  for (const patch of [{ program: 'full-program' }, { program: '__proto__' }, { stage: 'unknown' }, { problem: '   ' }, { progress: '' }, { support: null }, { business: {} }, { support: 'x'.repeat(251) }]) {
    assert.ok(validateProgramApplication({ ...valid, ...patch }).error);
  }
  for (const value of [undefined, null, [], 'application']) assert.ok(validateProgramApplication(value).error);
});
test('preserves all answers at maximum length within existing storage limit', () => {
  const { data } = validateProgramApplication({ ...valid, business: 'b'.repeat(80), problem: 'p'.repeat(200), progress: 'r'.repeat(350), support: 's'.repeat(250), stage: applicationStages[3] });
  const message = `Inquiry type: ${applicationCategory}\n\n${formatProgramApplication(data)}`;
  assert.ok(message.length <= 1500);
  assert.ok(message.includes(data.support));
  assert.ok(message.includes(data.progress));
});
test('trims whitespace without dropping meaningful content', () => {
  const { data } = validateProgramApplication({ ...valid, business: '  First idea  ', problem: '  A real problem  ' });
  assert.equal(data.business, 'First idea');
  assert.equal(data.problem, 'A real problem');
});
