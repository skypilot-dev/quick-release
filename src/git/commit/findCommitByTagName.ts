import { CommitRecord } from '../types';
import { git } from '../git';
import { findCommitBySha } from './findCommitBySha';

export async function findCommitByTagName(tagName: string): Promise<CommitRecord | null> {
  const sha: string = await git(`git rev-parse ${tagName}^{}`);
  if (!sha) {
    return null;
  }
  return findCommitBySha(sha);
}
