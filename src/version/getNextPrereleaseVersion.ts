/* eslint-disable no-console */
import { bumpVersion, changeLevelToString, PrereleaseVersion } from '@skypilot/versioner';
import { ChangeLevel } from 'src/changeLevel/constants';
import { parseMessagesChangeLevel } from 'src/changeLevel/parseMessagesChangeLevel';
import { STABLE_BRANCH } from 'src/config';
import { retrieveCurrentBranchName } from 'src/git';
import { findCommitsSinceStable } from 'src/git/commit/findCommitsSinceStable';
import { retrieveTags } from 'src/git/tag/retrieveTags';
import { retrieveTagsAtHead } from 'src/git/tag/retrieveTagsAtHead';
import { readPublishedVersions } from './parsePublishedVersions';
import { getCoreVersion } from './getCoreVersion';

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
    console.log('Prerelease version tags at HEAD:', versionTagNamesAtHead);
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
    console.log('Version tags', taggedVersions);
    console.log('Published versions:', publishedVersions);
    console.log('All versions in this channel:', filteredVersions);
  }

  const nextVersion = bumpVersion(currentVersion, changeLevel, channel, filteredVersions);
  if (verbose) {
    console.log('Commits since stable:', commitsSinceStable);
    console.log('Change level:', changeLevel, changeLevelToString(changeLevel));
    console.log('Next prerelease version:', nextVersion);
  }
  return nextVersion;
}
