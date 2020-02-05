import { retrieveCurrentBranchName } from '@skypilot/nodegit-tools';
import { bumpVersion, PrereleaseVersion, ReleaseVersion } from '@skypilot/versioner';
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

  const currentCoreVersionString = getCoreVersion();
  const currentReleaseVersion = new ReleaseVersion(currentCoreVersionString);
  const channelVersionFilter = PrereleaseVersion.versionFilterFn(currentReleaseVersion, channel);

  /* Handle the case when the current commit is already tagged as a prerelease. */
  const versionTagNamesAtCurrentCommit = (await retrieveTagsAtHead())
    .map(({ name }) => name)
    .filter(channelVersionFilter);

  if (versionTagNamesAtCurrentCommit.length > 0) {
    /* The commit is already tagged as a prerelease in this channel, so return the highest tag. */
    const highestVersionAtHead = PrereleaseVersion.highestOf(versionTagNamesAtCurrentCommit);
    return new PrereleaseVersion(highestVersionAtHead).versionString;
  }

  /* The release isn't tagged, which means this is a fresh release. Get all commits since this
   * branch diverged from `master` and analyze them to determine the change level. */
  const commitsSinceMaster = (await findCommitsSinceStable())
    .map(({ message }) => message);
  const changeLevel = parseMessagesChangeLevel(commitsSinceMaster);

  /* Get all tags in the repo plus all tags fetched from from NPM;
   * `bumpVersion` will use them to compute the next iteration. */
  const tagNames = (await retrieveTags())
    .map(({ name }) => name)
    .concat(...readPublishedVersions());
  return bumpVersion(currentCoreVersionString, changeLevel, channel, tagNames);
}
