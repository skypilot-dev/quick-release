import {
  findCommitBySha,
  findRangeOfCommitsBySha,
  getCommitRecord,
  retrieveHeadCommit,
} from '@skypilot/nodegit-tools';
import { CommitRecord } from '@skypilot/nodegit-tools/lib/functions/commit/getCommitRecord';

export async function findCommitsSinceSha(sha: string): Promise<CommitRecord[]> {
  const headCommit = await retrieveHeadCommit();
  const earliestCommit = await findCommitBySha(sha);

  if (!headCommit || !earliestCommit) {
    throw new Error('Range could not be found');
  }

  const head = getCommitRecord(headCommit);
  const earliest = getCommitRecord(earliestCommit);

  const commits = await findRangeOfCommitsBySha(head.sha, earliest.sha);
  return commits.map((commit) => getCommitRecord(commit));
}
