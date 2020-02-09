import { git } from '../git';

export async function retrieveTagNames(): Promise<string[]> {
  const gitCommand = 'git tag --list';
  return git(gitCommand)
    .then((tagNames) => tagNames.split('\n'))
    .catch(() => []);
}
