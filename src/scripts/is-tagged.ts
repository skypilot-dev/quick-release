#!/usr/bin/env node
import { PrereleaseVersion, ReleaseVersion } from '@skypilot/versioner';
import { retrieveTags } from '../git/tag/retrieveTags';

function isTaggedRelease(versionString: string, publishedVersions: string[]): boolean {
  const sorter = ReleaseVersion.sorter;
  return publishedVersions.some(
    (publishedVersion) => sorter(versionString, publishedVersion) === 0
  );
}

function isTaggedPrerelease(versionString: string, publishedVersions: string[], channel: string): boolean {
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

async function isVersionTagged(versionString: string): Promise<boolean> {
  const tagNames = (await retrieveTags()).map(({ name }) => name);

  if (ReleaseVersion.versionPattern().test(versionString)) {
    return isTaggedRelease(
      versionString,
      tagNames.filter(ReleaseVersion.versionPatternFilter)
    );
  }

  if (PrereleaseVersion.versionPattern().test(versionString)) {
    const { channel } = new PrereleaseVersion(versionString).versionRecord;
    return isTaggedPrerelease(
      versionString,
      tagNames.filter(PrereleaseVersion.versionPatternFilterFn()),
      channel
    );
  }
  return tagNames.includes(versionString);
}

{
  const args = process.argv.slice(2);
  const [versionString] = args;
  isVersionTagged(versionString)
    .then((isTagged) => console.log(isTagged))
    .catch(() => console.log(false));
}
