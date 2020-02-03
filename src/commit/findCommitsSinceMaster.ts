import { getCommitRecord, retrieveHeadCommit } from '@skypilot/nodegit-tools';
import { CommitRecord } from '@skypilot/nodegit-tools/lib/functions/commit/getCommitRecord';
import { findCommitsSinceSha } from './findCommitsSinceSha';

export async function findCommitsSinceMaster(): Promise<CommitRecord[]> {
  const headCommit = await retrieveHeadCommit();
  const taggedSha = await getCommitRecord(headCommit).sha;
  return findCommitsSinceSha(taggedSha);
}
