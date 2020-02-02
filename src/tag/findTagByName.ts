import { findCommitByTagName, getCommitRecord } from '@skypilot/nodegit-tools';
import { GitTag } from './types';

export async function findTagByName(tagName: string): Promise<GitTag | null> {
  const commit = await findCommitByTagName(tagName);
  if (!commit) {
    return null;
  }
  const { date, sha } = getCommitRecord(commit);
  return {
    date,
    name: tagName,
    sha,
  }
}
