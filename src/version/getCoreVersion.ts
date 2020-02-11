import { readPackageFile } from '@skypilot/sugarbowl';
import { PrereleaseVersion, ReleaseVersion } from '@skypilot/versioner';

export function getCoreVersion(): string {
  /* FIXME: Always read the version number from the latest commit on the stable branch. */
  const versionString = readPackageFile().version as string;
  if (ReleaseVersion.versionPattern().test(versionString)) {
    return versionString;
  }
  const prereleaseVersion = new PrereleaseVersion(versionString);
  const { major, minor, patch } = prereleaseVersion.versionRecord;
  const coreVersion = new ReleaseVersion({ major, minor, patch });
  return coreVersion.versionString as string;
}
