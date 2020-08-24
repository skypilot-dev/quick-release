import { retrieveHeadCommit } from '../commit/retrieveHeadCommit';
import type { GitCommit, GitTag } from '../types';
import { retrieveTags } from './retrieveTags';

export async function retrieveTagsAtHead(): Promise<GitTag[]> {
  const commit: GitCommit | null = await retrieveHeadCommit();
  if (!commit) {
    return [];
  }
  const allTags = await retrieveTags();
  return allTags.filter((tag) => tag.sha === commit.sha);
}
