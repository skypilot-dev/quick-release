import { STABLE_BRANCH } from '../config';
import { retrieveCurrentBranchName } from '../git';
import { getNextReleaseVersion } from './getNextReleaseVersion';
import { GetNextVersionOptions, getNextPrereleaseVersion } from './getNextPrereleaseVersion';

export async function getNextVersion(options: GetNextVersionOptions = {}): Promise<string> {
  const {
    channel = await retrieveCurrentBranchName(),
  } = options;

  if (channel === STABLE_BRANCH) {
    return await getNextReleaseVersion();
  }
  return await getNextPrereleaseVersion({ channel });
}
