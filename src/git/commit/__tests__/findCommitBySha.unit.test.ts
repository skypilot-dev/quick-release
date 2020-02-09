import { findCommitBySha } from '../findCommitBySha';
import { retrieveHeadCommit } from '../retrieveHeadCommit';

describe('findCommitBySha', () => {
  it('should find a commit by SHA', async () => {
    const headCommit = await retrieveHeadCommit();
    const { sha } = headCommit;

    const commit = await findCommitBySha(sha);
    expect(commit.sha).toBe(sha);
  });
});
