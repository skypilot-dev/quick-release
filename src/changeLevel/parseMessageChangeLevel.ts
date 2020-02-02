import { ChangeLevel, COMMIT_TYPE_DEFS } from './constants';

export function parseMessageChangeLevel(message: string): ChangeLevel {
  let prefix: string;
  for (let i = 0; i < COMMIT_TYPE_DEFS.length; i += 1) {
    const commitType = COMMIT_TYPE_DEFS[i];
    const { changeLevel, prefixes } = commitType;
    const matches = message.toLowerCase().match(/^([^:]+):/);
    if (matches) {
      prefix = matches[1];
      if (prefixes.includes(prefix)) {
        return changeLevel;
      }
    }
  }
  return ChangeLevel.none;
}
