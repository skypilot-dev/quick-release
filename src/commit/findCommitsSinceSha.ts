import {
  findCommitBySha,
  getCommitRecord,
  retrieveHeadCommit,
} from '@skypilot/nodegit-tools';
import { CommitRecord } from '@skypilot/nodegit-tools/lib/functions/commit/getCommitRecord';
import { git } from '../git/git';
import { parseCommitsFromLog } from './parseCommitLog';

const ISO_TIMESTAMP_FORMAT = 'format-local:%Y-%m-%dT%H:%M:%SZ';

export async function findCommitsSinceSha(sha: string): Promise<CommitRecord[]> {
  const headCommit = await retrieveHeadCommit();
  const earliestCommit = await findCommitBySha(sha);

  if (!headCommit || !earliestCommit) {
    throw new Error('Range could not be found');
  }

  const head = getCommitRecord(headCommit);
  const earliest = getCommitRecord(earliestCommit);

  const cmd = [
    'git log',
    `--date='${ISO_TIMESTAMP_FORMAT}'`,
    "--format='%h %cd %s'",
    '--no-merges',
    '--no-color',
    `${earliest.sha}...${head.sha}`,
  ].join(' ');
  return git(cmd, { preCommand: 'TZ=UTC' }).then((resultString) => parseCommitsFromLog(resultString));
}
