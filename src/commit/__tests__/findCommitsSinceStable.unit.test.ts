import { CommitRecord } from '@skypilot/nodegit-tools/lib/functions/commit/getCommitRecord';
import { findCommitsSinceStable } from '../findCommitsSinceStable';

describe('findCommitsSinceMaster()', () => {
  it('should return an array of commits', async () => {
    const commits: CommitRecord[] = await findCommitsSinceStable();
    expect(Array.isArray(commits)).toBe(true);
    if (commits.length > 0) {
      const [firstCommit] = commits;
      expect(firstCommit).toHaveProperty('date');
      expect(firstCommit).toHaveProperty('message');
      expect(firstCommit).toHaveProperty('sha');
    }
  });
});
