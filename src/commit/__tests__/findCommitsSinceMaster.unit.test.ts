import { CommitRecord } from '@skypilot/nodegit-tools/lib/functions/commit/getCommitRecord';
import { findCommitsSinceMaster } from '../findCommitsSinceMaster';

describe('findCommitsSinceMaster()', () => {
  it('should return an array of commits', async () => {
    const commits: CommitRecord[] = await findCommitsSinceMaster();
    expect(Array.isArray(commits)).toBe(true);
    if (commits.length > 0) {
      const [firstCommit] = commits;
      expect(firstCommit).toHaveProperty('date');
      expect(firstCommit).toHaveProperty('message');
      expect(firstCommit).toHaveProperty('sha');
    }
  });
});
