import { retrieveHeadCommit } from '../retrieveHeadCommit';

describe('retrieveHeadCommit()', () => {
  it('should', async () => {
    const headCommit = await retrieveHeadCommit();
    expect.assertions(3);
    expect(headCommit).toBeTruthy();
    if (headCommit) {
      expect(typeof headCommit.sha).toBe('string');
      expect(headCommit.sha).toHaveLength(40);
    }
  });
});
