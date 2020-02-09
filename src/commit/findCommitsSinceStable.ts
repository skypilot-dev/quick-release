import { findCommitByBranchName, getCommitRecord } from '@skypilot/nodegit-tools';
import { STABLE_BRANCH } from '../config';
import { CommitRecord } from '../git/types';
import { findCommitsSinceSha } from './findCommitsSinceSha';

export async function findCommitsSinceStable(): Promise<CommitRecord[]> {
  const stableCommit = await findCommitByBranchName(STABLE_BRANCH);
  const stableSha = getCommitRecord(stableCommit).sha;
  return findCommitsSinceSha(stableSha);
}
