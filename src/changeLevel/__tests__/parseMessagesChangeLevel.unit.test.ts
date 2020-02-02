import { ChangeLevel } from '../constants';
import { parseMessagesChangeLevel } from '../parseMessagesChangeLevel';

describe('parseMessagesChangeLevel(message:string)', () => {
  it('when there are no prefixes, should return ChangeLevel.none', () => {
    const commitMessages = [
      'message with no prefix',
      'message containing but not starting with prefixes: fix feat drop!',
    ];
    const changeLevel: ChangeLevel = parseMessagesChangeLevel(commitMessages);
    expect(changeLevel).toBe(ChangeLevel.none);
  });

  it('when any of the messages a major prefix, should return ChangeLevel.major', () => {
    const commitMessages = [
      'drop!: A feature was dropped',
      'fix: A bug was fixed',
    ];
    const changeLevel: ChangeLevel = parseMessagesChangeLevel(commitMessages);
    expect(changeLevel).toBe(ChangeLevel.major);
  });

  it('when the highest prefix the messages contain is a minor prefix, should return ChangeLevel.minor', () => {
    const commitMessages = [
      'feat: A feature was added',
      'fix: A bug was fixed',
    ];
    const changeLevel: ChangeLevel = parseMessagesChangeLevel(commitMessages);
    expect(changeLevel).toBe(ChangeLevel.minor);
  });

  it('when the highest prefix the messages contain is a patch prefix, should return ChangeLevel.patch', () => {
    const commitMessages = [
      'message with no prefix',
      'fix: A bug was fixed',
    ];
    const changeLevel: ChangeLevel = parseMessagesChangeLevel(commitMessages);
    expect(changeLevel).toBe(ChangeLevel.patch);
  });
});
