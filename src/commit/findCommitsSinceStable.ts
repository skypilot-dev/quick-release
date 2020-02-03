import { findCommitByBranchName, getCommitRecord } from '@skypilot/nodegit-tools';
import { CommitRecord } from '@skypilot/nodegit-tools/lib/functions/commit/getCommitRecord';
import { STABLE_BRANCH } from '../config';
import { findCommitsSinceSha } from './findCommitsSinceSha';

export async function findCommitsSinceStable(): Promise<CommitRecord[]> {
  const stableCommit = await findCommitByBranchName(STABLE_BRANCH);
  const stableSha = getCommitRecord(stableCommit).sha;
  return findCommitsSinceSha(stableSha);
}
