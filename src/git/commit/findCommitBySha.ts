import { CommitRecord } from '../types';
import { parseCommitFromLogEntry } from '../../commit/parseCommitFromLogEntry';
import { git } from '../git';

import { PARSABLE_LOG_COMMAND } from './constants';

export async function findCommitBySha(sha: string): Promise<CommitRecord> {
  const gitCommand = [
    PARSABLE_LOG_COMMAND,
    `${sha}^..${sha}`,
  ].join(' ');

  return git(gitCommand)
    .then((logEntry) => parseCommitFromLogEntry(logEntry));
}
