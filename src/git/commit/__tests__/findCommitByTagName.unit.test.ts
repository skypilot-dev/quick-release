import { retrieveTags } from '../../../tag/retrieveTags';
import { GitTag } from '../../../tag/types';
import { CommitRecord } from '../../types';
import { findCommitByTagName } from '../findCommitByTagName';

describe('findCommitByTagName', () => {
  it('should return a GitCommit object for the tag if it exists', async () => {
    const tags: GitTag[] = await retrieveTags();
    const [firstTag] = tags;
    if (firstTag) {
      const commit: CommitRecord = await findCommitByTagName(firstTag.name) as CommitRecord;
      expect(commit.sha).toBe(firstTag.sha);
    }
  });
});
