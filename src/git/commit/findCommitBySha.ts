import { git } from '../git';
import { GitCommit } from '../types';
import { parseCommitFromLogEntry } from './parseCommitFromLogEntry';

import { PARSABLE_SHOW_COMMAND } from './constants';

export async function findCommitBySha(sha: string): Promise<GitCommit | null> {
  const gitCommand = [
    PARSABLE_SHOW_COMMAND,
    sha,
  ].join(' ');

  return git(gitCommand)
    .then((logEntry) => parseCommitFromLogEntry(logEntry))
    .catch(() => null);
}
