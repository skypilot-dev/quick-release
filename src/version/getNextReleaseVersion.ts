import { SortComparison } from '@skypilot/common-types';
import { ReleaseVersion } from '@skypilot/versioner';
import { ChangeLevel } from '..';
import { parseMessagesChangeLevel } from '../changeLevel/parseMessagesChangeLevel';
import { findCommitsSinceTag } from '../commit/findCommitsSinceTag';
import { STABLE_BRANCH } from '../config';
import { retrieveTags } from '../tag/retrieveTags';
import { retrieveTagsAtHead } from '../tag/retrieveTagsAtHead';

type VersionRecord = { releaseVersion: ReleaseVersion };
type ReleaseVersionSorter = (a: VersionRecord, b: VersionRecord) => SortComparison;

const sorterOnReleaseVersion: ReleaseVersionSorter = (a, b) => {
  const releaseVersionA = a.releaseVersion;
  const releaseVersionB = b.releaseVersion;
  return ReleaseVersion.sorter(releaseVersionA, releaseVersionB);
};

export async function getNextReleaseVersion(): Promise<string> {
  const versionPattern = ReleaseVersion.versionPattern();
  const tagsAtCurrentCommit = await retrieveTagsAtHead();

  /* Check whether the current channel already has a tag at the current commit. */
  if (tagsAtCurrentCommit.some(({ name }) => versionPattern.test(name))) {
    /* FIXME: Return a value instead of throwing an error. */
    throw new Error(`This commit has already been released to the '${STABLE_BRANCH}' branch`);
  }

  /* FIXME: To avoid versioning errors, automatically create tags whenever the version changes
   * in `package.json`. */
  /* Get all tags in the repo; then get the highest. */
  const sortedVersionRecords = (await retrieveTags())
    .filter((tag) => versionPattern.test(tag.name))
    .map((tag) => ({
      releaseVersion: new ReleaseVersion(tag.name),
      tagName: tag.name,
    }))
    .sort(sorterOnReleaseVersion)
    .reverse();

  if (sortedVersionRecords.length === 0) {
    /* No releases yet, so this is the first stable release. */
    return '1.0.0';
  }

  const coreVersion = sortedVersionRecords[0].tagName;
  const commitsSinceTag = (await findCommitsSinceTag(coreVersion))
    .map(({ message }) => message);
  /* The version must always be incremented, so enforce a change level of at least `patch`. */
  const changeLevel = Math.max(parseMessagesChangeLevel(commitsSinceTag), ChangeLevel.patch);
  const nextVersion = new ReleaseVersion(coreVersion).bump(changeLevel);
  return nextVersion.versionString;
}
