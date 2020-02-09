import { git } from '../git';

export async function retrieveCurrentBranchName(): Promise<string> {
  return git('git symbolic-ref --short HEAD');
}
