import { getCommitRecord, retrieveHeadCommit } from '@skypilot/nodegit-tools';
import { retrieveTags } from './retrieveTags';
import { GitTag } from './types';

export async function retrieveTagsAtHead(): Promise<GitTag[]> {
  const commit = await retrieveHeadCommit();
  const allTags = await retrieveTags();
  const commitSha = getCommitRecord(commit).sha;
  return allTags.filter((tag) => tag.sha === commitSha);
}
