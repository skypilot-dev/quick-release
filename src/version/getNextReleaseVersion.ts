import { ReleaseVersion } from '@skypilot/versioner';
import { findCommitsSinceTag } from '../git/commit/findCommitsSinceTag';
import { retrieveTags } from '../git/tag/retrieveTags';
import { retrieveTagsAtHead } from '../git/tag/retrieveTagsAtHead';
import { readPublishedVersions } from './parsePublishedVersions';
import { ChangeLevel, getCoreVersion, parseMessagesChangeLevel } from '..';

export async function getNextReleaseVersion(): Promise<string> {
  const currentVersion = getCoreVersion();
  const versionPattern = ReleaseVersion.versionPattern();

  /* First handle the case when the current commit is already tagged as a release. */
  const versionTagNamesAtCurrentCommit = (await retrieveTagsAtHead())
    .map(({ name }) => name)
    .filter(ReleaseVersion.versionFilter);

  if (versionTagNamesAtCurrentCommit.length > 0) {
    /* The commit is already tagged as a release, so return the highest tag. */
    const highestVersionAtHead = ReleaseVersion.highestOf([
      currentVersion,
      ...versionTagNamesAtCurrentCommit,
    ]);
    return new ReleaseVersion(highestVersionAtHead).versionString;
  }

  /* The current commit is not tagged as a release. Get the highest of all release tags. */
  const taggedVersions: string[] = (await retrieveTags())
    .map(({ name }) => name)
    .filter((tagName) => versionPattern.test(tagName));

  const publishedVersions: string[] = readPublishedVersions();

  if (taggedVersions.length === 0) {
    /* No releases yet. Use `1.0.0` to signify the first release, unless the version in
     * `package.json` is higher. */
    return ReleaseVersion.highestOf(['1.0.0', currentVersion]);
  }

  const highestVersion = ReleaseVersion.highestOf([...publishedVersions, ...taggedVersions]);
  const highestTag = ReleaseVersion.highestOf(taggedVersions);

  /* The version in the package file should match the highest version. When it doesn't, the change
   * level can't be calculated; fall back to doing a patch-bump on the highest known version. */
  if (ReleaseVersion.sorter(currentVersion, highestTag) < 0) {
    return new ReleaseVersion(highestVersion).bump(ChangeLevel.patch).versionString;
  }

  /* Otherwise (this being the usual situation), find changes since the highest version tag. */
  const minVersion = ReleaseVersion.highestOf([currentVersion, highestTag]);
  const commitsSinceTag = (await findCommitsSinceTag(highestTag))
    .map(({ message }) => message);
  /* The version must always be incremented, so enforce a change level of at least `patch`. */
  const changeLevel = Math.max(parseMessagesChangeLevel(commitsSinceTag), ChangeLevel.patch);
  const nextVersion = new ReleaseVersion(minVersion).bump(changeLevel);
  return nextVersion.versionString;
}
