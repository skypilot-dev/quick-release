import { SortComparison } from '@skypilot/common-types';
import { retrieveCurrentBranchName } from '@skypilot/nodegit-tools';
import { bumpVersion, PrereleaseVersion } from '@skypilot/versioner';
import { parseMessagesChangeLevel } from '../changeLevel/parseMessagesChangeLevel';
import { findCommitsSinceStable } from '../commit/findCommitsSinceStable';
import { STABLE_BRANCH } from '../config';
import { retrieveTags } from '../tag/retrieveTags';
import { retrieveTagsAtHead } from '../tag/retrieveTagsAtHead';
import { getCoreVersion } from './getCoreVersion';

type VersionRecord = { prereleaseVersion: PrereleaseVersion };
type PrereleaseVersionSorter = (a: VersionRecord, b: VersionRecord) => SortComparison;

export interface GetNextVersionOptions {
  channel?: string;
}

const sorterOnPrereleaseVersion: PrereleaseVersionSorter = (a, b) => {
  const prereleaseVersionA = a.prereleaseVersion;
  const prereleaseVersionB = b.prereleaseVersion;
  return PrereleaseVersion.sorter(prereleaseVersionA, prereleaseVersionB);
};

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
  const tagsAtCurrentCommit = await retrieveTagsAtHead();

  /* Check whether the current channel already has a tag at the current commit. */
  const sortedVersionRecords = tagsAtCurrentCommit
    .filter(({ name }) => channelVersionPattern.test(name))
    .map((tag) => ({
      prereleaseVersion: new PrereleaseVersion(tag.name),
      tagName: tag.name,
    }))
    .sort(sorterOnPrereleaseVersion)
    .reverse();

  /* TODO: Decide whether other action should be taken if a commit has already been tagged. */
  if (sortedVersionRecords.length > 0) {
    return sortedVersionRecords[0].prereleaseVersion.versionString;
  }

  const coreVersion = getCoreVersion();

  /* Get all commits since this branch diverged from `master`. */
  const commitsSinceMaster = (await findCommitsSinceStable())
    .map(({ message }) => message);
  const changeLevel = parseMessagesChangeLevel(commitsSinceMaster);

  /* Get all tags in the repo; `bumpVersion` will use them to compute the next iteration. */
  const tagNames = (await retrieveTags()).map(({ name }) => name);

  return bumpVersion(coreVersion, changeLevel, channel, tagNames);
}

