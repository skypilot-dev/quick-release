import { ReleaseVersion } from '@skypilot/versioner';
import { STABLE_BRANCH } from '../../config';
import { findCommitByBranchName } from '../../git/commit/findCommitByBranchName';
import { getNextReleaseVersion } from '../getNextReleaseVersion';

describe('getNextReleaseVersion()', () => {
  it('should return a version string', async () => {
    const stableCommit = await findCommitByBranchName(STABLE_BRANCH);
    if (stableCommit) {
      const versionString = await getNextReleaseVersion();
      expect(typeof versionString).toBe('string');
      const versionPattern = ReleaseVersion.versionPattern();
      expect(versionPattern.test(versionString)).toBe(true);
    }
  });
});
