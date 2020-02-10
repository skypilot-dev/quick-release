import { STABLE_BRANCH } from '../../config';
import { GitCommit } from '../types';
import { findCommitByBranchName } from './findCommitByBranchName';
import { findCommitsSinceSha } from './findCommitsSinceSha';

export async function findCommitsSinceStable(): Promise<GitCommit[]> {
  const stableCommit = await findCommitByBranchName(STABLE_BRANCH);
  if (!stableCommit) {
    return [];
  }
  return findCommitsSinceSha(stableCommit.sha);
}
