import { STABLE_BRANCH } from 'src/config';
import type { GitCommit } from '../../types';
import { findCommitByBranchName } from '../findCommitByBranchName';

describe('findCommitByBranchName(branchName:string)', () => {
  it('should return a GitCommit object', async () => {
    const commit: GitCommit | null = await findCommitByBranchName(STABLE_BRANCH);
    expect.assertions(3);
    if (commit) {
      expect(commit).toHaveProperty('date');
      expect(commit).toHaveProperty('message');
      expect(commit).toHaveProperty('sha');
    }
  });

  it('given a nonexistent branch, should return null', async () => {
    const commit: GitCommit | null = await findCommitByBranchName('nonexistent-branch');
    expect(commit).toBeNull();
  });
});
