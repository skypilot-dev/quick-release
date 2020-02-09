import { PrereleaseVersion, ReleaseVersion } from '@skypilot/versioner';
import { STABLE_BRANCH } from '../../config';
import { retrieveCurrentBranchName } from '../../git';
import { findCommitByBranchName } from '../../git/commit/findCommitByBranchName';
import { getNextVersion } from '../getNextVersion';

describe('getNextVersion()', () => {
  it('should return a string', async () => {
    const currentBranchName = await retrieveCurrentBranchName();
    if (currentBranchName) {
      const versionString = await getNextVersion();
      expect(typeof versionString).toBe('string');
    }
  });

  it(`if the branch is ${STABLE_BRANCH}, should return a core version`, async () => {
    const branchCommit = await findCommitByBranchName(STABLE_BRANCH);
    if (branchCommit) {
      const versionString = await getNextVersion({ channel: STABLE_BRANCH });
      const versionPattern = ReleaseVersion.versionPattern();
      expect(versionPattern.test(versionString)).toBe(true);
    }
  });

  it(`if the branch is not ${STABLE_BRANCH}, should return a prerelease version`, async () => {
    const branchCommit = await findCommitByBranchName('beta');
    if (branchCommit) {
      const versionString = await getNextVersion({ channel: 'beta' });
      const versionPattern = PrereleaseVersion.versionPattern();
      expect(versionPattern.test(versionString)).toBe(true);
    }
  });
});
