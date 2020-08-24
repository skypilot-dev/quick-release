import { git } from '../git';
import type { GitCommit } from '../types';
import { findCommitBySha } from './findCommitBySha';

export async function retrieveHeadCommit(): Promise<GitCommit | null> {
  const gitCommand = 'git rev-parse HEAD';
  return git(gitCommand)
    .then((sha) => findCommitBySha(sha))
    .catch(() => null);
}
