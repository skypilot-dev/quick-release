import type { GitCommit } from '../types';
import { parseCommitFromLogEntry } from './parseCommitFromLogEntry';

export function parseCommitsFromLog(commitLog: string): GitCommit[] {
  if (!commitLog) {
    return [];
  }

  return commitLog
    .split('\n')
    .filter((logEntry) => logEntry) // filter out empty entries
    .map((logEntry) => parseCommitFromLogEntry(logEntry));
}
