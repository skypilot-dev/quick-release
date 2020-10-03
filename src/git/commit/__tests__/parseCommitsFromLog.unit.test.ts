import type { GitCommit } from '../../types';
import { parseCommitsFromLog } from '../parseCommitsFromLog';

describe('parseCommitsFromLog', () => {
  it('should return an empty array if the log is empty', () => {
    const commitLog = '';

    const parsedCommits = parseCommitsFromLog(commitLog);

    const expectedCommits: GitCommit[] = [];
    expect(parsedCommits).toEqual(expectedCommits);
  });

  it('should return an empty array if the log consists only of a newline', () => {
    const commitLog = '\n';

    const parsedCommits = parseCommitsFromLog(commitLog);

    const expectedCommits: GitCommit[] = [];
    expect(parsedCommits).toEqual(expectedCommits);
  });
});
