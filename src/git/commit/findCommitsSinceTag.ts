import { findCommitByTagName } from '../index';
import { GitCommit } from '../types';
import { findCommitsSinceSha } from './findCommitsSinceSha';

export async function findCommitsSinceTag(tagName: string): Promise<GitCommit[]> {
  const taggedCommit = await findCommitByTagName(tagName);
  if (!taggedCommit) {
    return [];
  }
  return findCommitsSinceSha(taggedCommit.sha);
}
