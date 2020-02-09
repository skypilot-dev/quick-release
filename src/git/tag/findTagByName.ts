import { GitTag } from '../../tag/types';
import { findCommitByTagName } from '..';

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
