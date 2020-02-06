import { findCommitByTagName, getCommitRecord } from '@skypilot/nodegit-tools';
import { CommitRecord } from '@skypilot/nodegit-tools/lib/functions/commit/getCommitRecord';
import { findCommitsSinceSha } from './findCommitsSinceSha';

export async function findCommitsSinceTag(tagName: string): Promise<CommitRecord[]> {
  const taggedCommit = await findCommitByTagName(tagName);
  if (!taggedCommit) {
    return [];
  }
  const taggedSha = getCommitRecord(taggedCommit).sha;
  return findCommitsSinceSha(taggedSha);
}
