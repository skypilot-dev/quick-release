/* eslint-disable no-console */
import { bumpVersion, PrereleaseVersion } from '@skypilot/versioner';
import { findCommitsSinceStable } from '../git/commit/findCommitsSinceStable';
import { STABLE_BRANCH } from '../config';
import { retrieveCurrentBranchName } from '../git';
import { retrieveTags } from '../git/tag/retrieveTags';
import { retrieveTagsAtHead } from '../git/tag/retrieveTagsAtHead';
import { readPublishedVersions } from './parsePublishedVersions';
import { getCoreVersion } from './getCoreVersion';
import { ChangeLevel, parseMessagesChangeLevel } from '..';

export interface GetNextVersionOptions {
  channel?: string;
  verbose?: boolean;
}

export async function getNextPrereleaseVersion(options: GetNextVersionOptions = {}): Promise<string> {
  const {
    channel = await retrieveCurrentBranchName(),
    verbose,
  } = options;
  const currentVersion = getCoreVersion();

  if (!channel) {
    return '';
  }

  if (channel === STABLE_BRANCH) {
    return Promise.reject(
      `A prerelease version number can't be created on the '${STABLE_BRANCH}' branch`
    );
  }

  /* Handle the case when the current commit is already tagged as a prerelease in this channel. */
  const versionTagNamesAtHead = (await retrieveTagsAtHead())
    .map(({ name }) => name)
    .filter(PrereleaseVersion.versionPatternFilterFn(channel));
  if (verbose) {
    console.log('Channel:', channel);
    console.log('Current version:', currentVersion);
    console.log('Version tags at HEAD:', versionTagNamesAtHead);
  }

  if (versionTagNamesAtHead.length > 0) {
    /* The commit is already tagged as a prerelease in this channel, so the version should be
     * the highest tag at HEAD. Publication should be skipped. */
    const highestVersionAtHead = PrereleaseVersion.highestOf(versionTagNamesAtHead);
    return new PrereleaseVersion(highestVersionAtHead).versionString;
  }
  if (verbose) {
    console.log('Highest version tag at HEAD:', versionTagNamesAtHead);
  }

  /* Get all commits since this branch diverged from `master` & analyze them to determine the
   * change level. */
  const commitsSinceStable = (await findCommitsSinceStable())
    .map(({ message }) => message);

  /* If there are changes since the stable branch, there must be at least a patch bump. */
  const changeLevel = commitsSinceStable.length === 0
    ? ChangeLevel.none
    : Math.max(parseMessagesChangeLevel(commitsSinceStable), ChangeLevel.patch);

  /* Get all version tags for this channel, both from the repo & from NPM.
   * `bumpVersion` uses the version tags to compute the next iteration. */
  const taggedVersions: string[] = (await retrieveTags()).map(({ name }) => name);
  const publishedVersions: string[] = readPublishedVersions();
  const filteredVersions: string[] = taggedVersions
    .filter(PrereleaseVersion.versionPatternFilterFn(channel));
  if (verbose) {
    console.log('Tagged versions:', taggedVersions);
    console.log('Published versions:', publishedVersions);
    console.log('Filtered versions:', filteredVersions);
  }

  const nextVersion = bumpVersion(currentVersion, changeLevel, channel, filteredVersions);
  if (verbose) {
    console.log('Commits since stable:', commitsSinceStable);
    console.log('Change level:', changeLevel);
    console.log('Next version:', nextVersion);
  }
  return nextVersion;
}
