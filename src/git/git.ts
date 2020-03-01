import { exec } from 'child_process';
import { promisify } from 'util';

interface GitOptions {
  preCommand?: string;
}

const execAsync = promisify(exec);

export async function git(gitCommand: string, options: GitOptions = {}): Promise<string> {
  const {
    preCommand = '',
  } = options;

  const commandString = [
    preCommand,
    gitCommand,
  ].join(' ');

  const { stderr, stdout } = await execAsync(commandString, {});
  if (stderr) {
    return Promise.reject(stderr)
  }
  return stdout.trim();
}
