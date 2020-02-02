import { ChangeLevel, COMMIT_TYPE_DEFS } from '../constants';
import { parseMessageChangeLevel } from '../parseMessageChangeLevel';

describe('parseCommitChangeLevel(commitMessage:string)', () => {
  it("when the message has the 'feat:' prefix, should return ChangeLevel.minor", () => {
    const message = 'feat: A feature';
    const changeLevel = parseMessageChangeLevel(message);
    expect(changeLevel).toBe(ChangeLevel.minor);
  });

  it("when the message doesn't start with a prefix, should return ChangeLevel.none", () => {
    const message = 'A feat: major: minor: fix: message';
    const changeLevel = parseMessageChangeLevel(message);
    expect(changeLevel).toBe(ChangeLevel.none);
  });

  it('when the message has one of the special prefixes, should return the corresponding ChangeLevel', () => {
    expect.assertions(11);
    COMMIT_TYPE_DEFS.forEach((commitTypeDef) => {
      const { changeLevel, prefixes } = commitTypeDef;
      prefixes.forEach((prefix) => {
        expect(parseMessageChangeLevel(`${prefix}: message`)).toBe(changeLevel);
      });
    });
  });

  it('when the message has an unknown prefix, should return ChangeLevel.none', () => {
    const message = 'prefix: A task with no prefix';
    const changeLevel = parseMessageChangeLevel(message);
    expect(changeLevel).toBe(ChangeLevel.none);
  });

  it('when the message has no prefix, should return ChangeLevel.none', () => {
    const message = 'A task with no prefix';
    const changeLevel = parseMessageChangeLevel(message);
    expect(changeLevel).toBe(ChangeLevel.none);
  });
});

