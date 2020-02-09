import { parseCommitFromLogEntry } from '../../commit/parseCommitFromLogEntry';
import { git } from '../git';
import { CommitRecord } from '../types';
import { PARSABLE_LOG_COMMAND } from './constants';

export async function retrieveHeadCommit(): Promise<CommitRecord> {
  const gitCommand = [
    PARSABLE_LOG_COMMAND,
    'HEAD^..HEAD',
  ].join(' ');

  return git(gitCommand)
    .then((logEntry: string) => parseCommitFromLogEntry(logEntry));
}
