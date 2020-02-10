import { GitCommit } from '../types';
import { parseCommitFromLogEntry } from './parseCommitFromLogEntry';

export function parseCommitsFromLog(commitLog: string): GitCommit[] {
  return commitLog
    .split('\n')
    .map((logEntry) => parseCommitFromLogEntry(logEntry));
}
