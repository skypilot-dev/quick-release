import { GitCommit } from '../types';

export function parseCommitFromLogEntry(logEntry: string): GitCommit {
  const splits = logEntry.trim().split(' ');
  const [sha, dateString, ...message] = splits;

  return {
    date: new Date(Date.parse(dateString)),
    message: message.join(' '),
    sha,
  };
}
