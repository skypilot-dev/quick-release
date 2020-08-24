import { git } from '../git';
import type { GitCommit } from '../types';
import { findCommitBySha } from './findCommitBySha';

export async function findCommitByBranchName(branchName: string): Promise<GitCommit | null> {
  const gitCommand = `git rev-parse ${branchName}`;
  return git(gitCommand)
    .then((sha) => findCommitBySha(sha))
    .catch(() => null);
}
