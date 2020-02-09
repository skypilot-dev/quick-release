import { exec } from 'child_process';
import * as util from 'util';
import {
  findCommitBySha,
  getCommitRecord,
  retrieveHeadCommit,
} from '@skypilot/nodegit-tools';
import { CommitRecord } from '@skypilot/nodegit-tools/lib/functions/commit/getCommitRecord';
import { parseCommitsFromLog } from './parseCommitLog';

const ISO_TIMESTAMP_FORMAT = 'format-local:%Y-%m-%dT%H:%M:%SZ';
const execAsync = util.promisify(exec);

export async function findCommitsSinceSha(sha: string): Promise<CommitRecord[]> {
  const headCommit = await retrieveHeadCommit();
  const earliestCommit = await findCommitBySha(sha);

  if (!headCommit || !earliestCommit) {
    throw new Error('Range could not be found');
  }

  const head = getCommitRecord(headCommit);
  const earliest = getCommitRecord(earliestCommit);

  const cmd = 'TZ=UTC git log '
    + `--date='${ISO_TIMESTAMP_FORMAT}' `
    + "--format='%h %cd %s' "
    + '--no-merges '
    + '--no-color '
    + `${earliest.sha}...${head.sha}`;
  const { stdout } = await execAsync(cmd, {});
  return parseCommitsFromLog(stdout);
}
