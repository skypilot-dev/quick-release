import { findCommitBySha, git } from '../index';
import type { GitCommit } from '../types';
import { parseCommitsFromLog } from './parseCommitsFromLog';
import { PARSABLE_LOG_COMMAND } from './constants';
import { retrieveHeadCommit } from './retrieveHeadCommit';


export async function findCommitsSinceSha(sha: string): Promise<GitCommit[]> {
  const headCommit = await retrieveHeadCommit();
  const earliestCommit = await findCommitBySha(sha);

  if (!headCommit || !earliestCommit) {
    throw new Error('Range could not be found');
  }

  const gitCommand = [
    PARSABLE_LOG_COMMAND,
    `${earliestCommit.sha}...${headCommit.sha}`,
  ].join(' ');
  return git(gitCommand).then((resultString: string) => parseCommitsFromLog(resultString));
}
