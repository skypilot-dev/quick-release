import { GitCommit } from '../../types';
import { findCommitBySha } from '../findCommitBySha';
import { retrieveHeadCommit } from '../retrieveHeadCommit';

describe('findCommitBySha', () => {
  it('given a SHA, should return the corresponding GitCommit object', async () => {
    const headCommit: GitCommit | null = await retrieveHeadCommit();
    const { sha } = headCommit as GitCommit;

    const commit = await findCommitBySha(sha) as GitCommit;
    expect(commit.sha).toBe(sha);
  });

  it('given a nonexistent SHA, should return null', async () => {
    const commit: GitCommit | null = await findCommitBySha('nonexistent SHA');
    expect(commit).toBeNull();
  });
});
