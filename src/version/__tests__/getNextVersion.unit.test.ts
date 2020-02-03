import { PrereleaseVersion, ReleaseVersion } from '@skypilot/versioner';
import { STABLE_BRANCH } from '../../config';
import { getNextVersion } from '../getNextVersion';

describe('getNextVersion()', () => {
  it('should return a string', async () => {
    const versionString = await getNextVersion();
    expect(typeof versionString).toBe('string');
  });

  it(`if the branch is ${STABLE_BRANCH}, should return a core version`, async () => {
    const versionString = await getNextVersion({ channel: STABLE_BRANCH });
    const versionPattern = ReleaseVersion.versionPattern();
    expect(versionPattern.test(versionString)).toBe(true);
  });

  it(`if the branch is not ${STABLE_BRANCH}, should return a prerelease version`, async () => {
    const versionString = await getNextVersion({ channel: 'beta' });
    const versionPattern = PrereleaseVersion.versionPattern();
    expect(versionPattern.test(versionString)).toBe(true);
  });
});
