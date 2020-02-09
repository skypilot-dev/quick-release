import { STABLE_BRANCH } from '../../config';
import { findCommitByBranchName } from './findCommitByBranchName';
import { GitCommit } from '../types';
import { findCommitsSinceSha } from './findCommitsSinceSha';

export async function findCommitsSinceStable(): Promise<GitCommit[]> {
  const stableCommit = await findCommitByBranchName(STABLE_BRANCH);
  if (!stableCommit) {
    return [];
  }
  return findCommitsSinceSha(stableCommit.sha);
}
