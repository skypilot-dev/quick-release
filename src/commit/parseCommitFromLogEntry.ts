import { CommitRecord } from '@skypilot/nodegit-tools/lib/functions/commit/getCommitRecord';

export function parseCommitFromLogEntry(logEntry: string): CommitRecord {
  const splits = logEntry.trim().split(' ');
  const [sha, dateString, ...message] = splits;

  return {
    date: new Date(Date.parse(dateString)),
    message: message.join(' '),
    sha,
  };
}
