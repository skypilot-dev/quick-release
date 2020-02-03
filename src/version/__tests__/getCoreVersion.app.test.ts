import { ReleaseVersion } from '@skypilot/versioner';
import { getCoreVersion } from '../getCoreVersion';

describe('getCoreVersion()', () => {
  it('should return a version string', () => {
    const versionString = getCoreVersion();
    const versionPattern = ReleaseVersion.versionPattern();
    expect(versionPattern.test(versionString)).toBe(true);
  });
});
