import { ReleaseVersion } from '@skypilot/versioner';
import { getNextReleaseVersion } from '../getNextReleaseVersion';

describe('getNextReleaseVersion()', () => {
  it('should return a version string', async () => {
    const versionString = await getNextReleaseVersion();
    expect(typeof versionString).toBe('string');
    const versionPattern = ReleaseVersion.versionPattern();
    expect(versionPattern.test(versionString)).toBe(true);
  });
});
