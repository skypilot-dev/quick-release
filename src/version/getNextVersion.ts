import { STABLE_BRANCH } from '../config';
import { retrieveCurrentBranchName } from '../git';
import { getNextReleaseVersion } from './getNextReleaseVersion';
import { GetNextVersionOptions, getNextPrereleaseVersion } from './getNextPrereleaseVersion';

export async function getNextVersion(options: GetNextVersionOptions = {}): Promise<string> {
  const { channel } = options;
  const resolvedChannel = channel || await retrieveCurrentBranchName();

  if (!resolvedChannel) {
    return '';
  }

  if (resolvedChannel === STABLE_BRANCH) {
    return await getNextReleaseVersion();
  }
  return await getNextPrereleaseVersion({ channel: resolvedChannel });
}
