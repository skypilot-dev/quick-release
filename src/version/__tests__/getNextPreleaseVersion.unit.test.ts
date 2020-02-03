import { PrereleaseVersion } from '@skypilot/versioner';
import { STABLE_BRANCH } from '../../config';
import { getNextPrereleaseVersion } from '../getNextPrereleaseVersion';

describe('getNextReleaseVersion()', () => {
  it(`if the branch is not '${STABLE_BRANCH}', should return a prerelease version string`, async () => {
    const versionString = await getNextPrereleaseVersion({ channel: 'beta' });
    expect(typeof versionString).toBe('string');
    const versionPattern = PrereleaseVersion.versionPattern('beta');
    expect(versionPattern.test(versionString)).toBe(true);
  });

  it(`if the branch is '${STABLE_BRANCH}', should throw an error`, async () => {
    await expect(getNextPrereleaseVersion({ channel: STABLE_BRANCH }))
      .rejects.toEqual(
        `A prerelease version number can't be created on the '${STABLE_BRANCH}' branch`,
      );
  });
});
