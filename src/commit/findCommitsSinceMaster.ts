import {
  findCommitByBranchName,
  findRangeOfCommitsBySha, getCommitRecord,
  retrieveHeadCommit,
} from '@skypilot/nodegit-tools';
import { CommitRecord } from '@skypilot/nodegit-tools/lib/functions/commit/getCommitRecord';

export async function findCommitsSinceMaster(): Promise<CommitRecord[]> {
  const headCommit = await retrieveHeadCommit();
  const masterCommit = await findCommitByBranchName('master');

  if (!headCommit || !masterCommit) {
    throw new Error('Range could not be found');
  }

  const head = getCommitRecord(headCommit);
  const master = getCommitRecord(masterCommit);

  const commitsSinceMaster = await findRangeOfCommitsBySha(head.sha, master.sha);
  return commitsSinceMaster.map((commit) => getCommitRecord(commit));
}
