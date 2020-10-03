import type { GitCommit } from '../types';
import { git } from '../git';
import { findCommitBySha } from './findCommitBySha';

export async function findCommitByTagName(tagName: string): Promise<GitCommit | null> {
  const gitCommand = `git rev-parse ${tagName}^{}`;
  return git(gitCommand)
    .then((sha) => findCommitBySha(sha))
    .catch(() => null);
}
