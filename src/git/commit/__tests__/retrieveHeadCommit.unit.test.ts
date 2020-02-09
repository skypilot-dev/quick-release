import { retrieveHeadCommit } from '../retrieveHeadCommit';

describe('retrieveHeadCommit()', () => {
  it('should', async () => {
    const headCommit = await retrieveHeadCommit();
    expect(headCommit).toBeTruthy();
    expect(typeof headCommit.sha).toBe('string');
    expect(headCommit.sha).toHaveLength(40);
  });
});
