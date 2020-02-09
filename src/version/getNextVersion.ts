import { STABLE_BRANCH } from '../config';
import { retrieveCurrentBranchName } from '../git';
import { getNextReleaseVersion } from './getNextReleaseVersion';
import { GetNextVersionOptions, getNextPrereleaseVersion } from './getNextPrereleaseVersion';

export async function getNextVersion(options: GetNextVersionOptions = {}): Promise<string> {
  const { channel, verbose } = options;
  const branchName = channel || await retrieveCurrentBranchName();

  if (verbose) {
    console.log(`Branch name: ${branchName}`);
  }

  if (!branchName) {
    return '';
  }

  if (branchName === STABLE_BRANCH) {
    return await getNextReleaseVersion({ verbose });
  }
  return await getNextPrereleaseVersion({ channel: branchName });
}
