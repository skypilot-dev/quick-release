import { retrieveCurrentBranchName } from '@skypilot/nodegit-tools';
import { STABLE_BRANCH } from '../config';
import { getNextReleaseVersion } from './getNextReleaseVersion';
import { GetNextVersionOptions, getNextPrereleaseVersion } from './getNextPrereleaseVersion';

export async function getNextVersion(options: GetNextVersionOptions = {}): Promise<string> {
  const {
    channel = await retrieveCurrentBranchName() as string,
  } = options;

  if (channel === STABLE_BRANCH) {
    return await getNextReleaseVersion();
  }
  return await getNextPrereleaseVersion({ channel });
}
