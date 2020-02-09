import { CommitRecord } from '@skypilot/nodegit-tools/lib/functions/commit/getCommitRecord';
import { parseCommitFromLogEntry } from './parseCommitFromLogEntry';

export function parseCommitsFromLog(commitLog: string): CommitRecord[] {
  return commitLog
    .split('\n')
    .map((logEntry) => parseCommitFromLogEntry(logEntry));
}
