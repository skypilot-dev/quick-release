import { findCommitByTagName } from '..';
import { GitTag } from '../types';

export async function findTagByName(tagName: string): Promise<GitTag | null> {
  const commit = await findCommitByTagName(tagName);
  if (!commit) {
    return null;
  }
  const { date, sha } = commit;
  return {
    date,
    name: tagName,
    sha,
  }
}
