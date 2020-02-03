import { PrereleaseVersion, ReleaseVersion } from '@skypilot/versioner';
import { getCurrentVersion } from '../getCurrentVersion';

describe('getCurrentVersion()', () => {
  it('should return a version string', () => {
    const versionString: string = getCurrentVersion();
    expect(
      ReleaseVersion.versionPattern().test(versionString)
      || PrereleaseVersion.versionPattern().test(versionString)
    ).toBe(true);
  });
});
