import { retrieveCurrentBranchName } from '@skypilot/nodegit-tools';
import { bumpVersion, PrereleaseVersion } from '@skypilot/versioner';
import { ChangeLevel } from '..';
import { parseMessagesChangeLevel } from '../changeLevel/parseMessagesChangeLevel';
import { findCommitsSinceStable } from '../commit/findCommitsSinceStable';
import { STABLE_BRANCH } from '../config';
import { retrieveTags } from '../tag/retrieveTags';
import { retrieveTagsAtHead } from '../tag/retrieveTagsAtHead';
import { readPublishedVersions } from './parsePublishedVersions';
import { getCoreVersion } from './getCoreVersion';

export interface GetNextVersionOptions {
  channel?: string;
}

export async function getNextPrereleaseVersion(options: GetNextVersionOptions = {}): Promise<string> {
  const {
    channel = await retrieveCurrentBranchName() as string,
  } = options;

  if (channel === STABLE_BRANCH) {
    return Promise.reject(
      `A prerelease version number can't be created on the '${STABLE_BRANCH}' branch`
    );
  }

  const channelVersionPattern = PrereleaseVersion.versionPattern(channel);

  /* Handle the case when the current commit is already tagged as a prerelease in this channel. */
  const versionTagNamesAtCurrentCommit = (await retrieveTagsAtHead())
    .map(({ name }) => name)
    .filter((tagName) => channelVersionPattern.test(tagName));

  if (versionTagNamesAtCurrentCommit.length > 0) {
    /* The commit is already tagged as a prerelease in this channel, so return the highest tag. */
    const highestVersionAtHead = PrereleaseVersion.highestOf(versionTagNamesAtCurrentCommit);
    return new PrereleaseVersion(highestVersionAtHead).versionString;
  }

  /* The commit isn't tagged as a prerelease, so this is a new prerelease. Get all commits since
   * this branch diverged from `master` & analyze them to determine the change level. */
  const commitsSinceStable = (await findCommitsSinceStable())
    .map(({ message }) => message);

  /* If there are changes since master (the length includes the current commit),
   * there must be at least a patch bump. */
  const changeLevel = commitsSinceStable.length <= 1
    ? ChangeLevel.none
    : Math.max(parseMessagesChangeLevel(commitsSinceStable), ChangeLevel.patch);

  /* Get all tags in the repo plus all tags fetched from from NPM;
   * `bumpVersion` will use them to compute the next iteration. */
  const tagNames = (await retrieveTags())
    .map(({ name }) => name)
    .concat(...readPublishedVersions());
  return bumpVersion(getCoreVersion(), changeLevel, channel, tagNames);
}
