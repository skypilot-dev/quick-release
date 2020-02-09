import { retrieveTags } from '../../tag/retrieveTags';
import { GitCommit, GitTag } from '../../types';
import { findCommitByTagName } from '../findCommitByTagName';

describe('findCommitByTagName', () => {
  it('should return a GitCommit object for the tag if it exists', async () => {
    const tags: GitTag[] = await retrieveTags();
    const [firstTag] = tags;
    if (firstTag) {
      const commit: GitCommit = await findCommitByTagName(firstTag.name) as GitCommit;
      expect(commit.sha).toBe(firstTag.sha);
    }
  });

  it('should return null if the tag does not exist', async () => {
    const commit: GitCommit = await findCommitByTagName('nonexistent-tag') as GitCommit;
    expect(commit).toBeNull();
  });
});
