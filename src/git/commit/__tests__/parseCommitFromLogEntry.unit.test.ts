import type { GitCommit } from '../../types';
import { parseCommitFromLogEntry } from '../parseCommitFromLogEntry';

describe('parseCommitFromLogEntry(commitLogEntry:string', () => {
  it('should parse the elements of a commit log entry', () => {
    const logEntry = '921ee99 2020-02-08T03:41:51Z fix path creation when writing commit messages';
    // do something
    const commit = parseCommitFromLogEntry(logEntry);

    const expectedCommit: GitCommit = {
      date: new Date(Date.parse('2020-02-08T03:41:51Z')),
      message: 'fix path creation when writing commit messages',
      sha: '921ee99',
    };
    expect(commit).toMatchObject(expectedCommit);
  });

  it('can parse a commit message that contains quotes or escaped characters', () => {
    const baseEntry = '921ee99 2020-02-08T03:41:51Z';
    const messages = [
      'This commit `contains \'all\' "quotation" marks`',
      'This commit an unclosed `backticks',
      'This commit contains "double quotes"',
      'This commit\ncontains\nline breaks',
    ];

    messages.forEach((message, index) => {
      const logEntry = `${baseEntry} ${message}`;
      const commit = parseCommitFromLogEntry(logEntry);
      expect(commit).toMatchObject({
        date: new Date(Date.parse('2020-02-08T03:41:51Z')),
        message: messages[index],
        sha: '921ee99',
      });
    });
  });
});
