/* Given an array of commit messages, parse & return their highest change level. */
import { ChangeLevel, COMMIT_TYPE_DEFS } from './constants';
import { parseMessageChangeLevel } from './parseMessageChangeLevel';


export function parseMessagesChangeLevel(commitMessages: string[]): ChangeLevel {
  for (let i = 0; i < COMMIT_TYPE_DEFS.length; i += 1) {
    const commitTypeDef = COMMIT_TYPE_DEFS[i];
    const { changeLevel } = commitTypeDef;
    if (commitMessages.some((message) => parseMessageChangeLevel(message) === changeLevel)) {
      return changeLevel;
    }
  }
  return ChangeLevel.none;
}
