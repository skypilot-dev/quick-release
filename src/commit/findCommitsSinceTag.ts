import { CommitRecord } from '@skypilot/nodegit-tools/lib/functions/commit/getCommitRecord';
import { findCommitByTagName } from '../git';
import { findCommitsSinceSha } from './findCommitsSinceSha';

export async function findCommitsSinceTag(tagName: string): Promise<CommitRecord[]> {
  const taggedCommit = await findCommitByTagName(tagName);
  if (!taggedCommit) {
    return [];
  }
  return findCommitsSinceSha(taggedCommit.sha);
}
