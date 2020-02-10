#!/usr/bin/env node
import { PrereleaseVersion, ReleaseVersion } from '@skypilot/versioner';
import { readPublishedVersions } from '../version/parsePublishedVersions';

function isPublishedRelease(versionString: string, publishedVersions: string[]): boolean {
  const sorter = ReleaseVersion.sorter;
  return publishedVersions.some(
    (publishedVersion) => sorter(versionString, publishedVersion) === 0
  );
}

function isPublishedPrerelease(versionString: string, publishedVersions: string[], channel: string): boolean {
  const sorter = PrereleaseVersion.sorter;
  return publishedVersions
    .filter(PrereleaseVersion.versionPatternFilterFn(channel))
    .some(
      (publishedVersion) => sorter(
        new PrereleaseVersion(versionString).versionRecord,
        new PrereleaseVersion(publishedVersion).versionRecord
      ) === 0
    );
}

function isVersionPublished(versionString: string): boolean {
  const publishedVersions = readPublishedVersions();
  // console.log('publishedVersions:', publishedVersions);
  if (ReleaseVersion.versionPattern().test(versionString)) {
    return isPublishedRelease(
      versionString,
      publishedVersions.filter(ReleaseVersion.versionPatternFilter)
    );
  }
  if (PrereleaseVersion.versionPattern().test(versionString)) {
    const { channel } = new PrereleaseVersion(versionString).versionRecord;
    return isPublishedPrerelease(
      versionString,
      publishedVersions.filter(PrereleaseVersion.versionPatternFilterFn()),
      channel
    );
  }
  throw new Error(`Invalid version string: ${versionString}`)
}

{
  const args = process.argv.slice(2);
  const [versionString] = args;
  console.log(isVersionPublished(versionString));
}
