import type { GitCommit } from '../../types';
import { findCommitsSinceStable } from '../findCommitsSinceStable';

describe('findCommitsSinceMaster()', () => {
  it('should return an array of commits', async () => {
    const commits: GitCommit[] = await findCommitsSinceStable();
    expect(Array.isArray(commits)).toBe(true);
    if (commits.length > 0) {
      const [firstCommit] = commits;
      expect(firstCommit).toHaveProperty('date');
      expect(firstCommit).toHaveProperty('message');
      expect(firstCommit).toHaveProperty('sha');
    }
  });
});
