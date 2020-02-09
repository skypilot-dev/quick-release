import { exec } from 'child_process';
import * as util from 'util';

interface GitOptions {
  preCommand?: string;
}

const execAsync = util.promisify(exec);

export async function git(gitCommand: string, options: GitOptions = {}): Promise<string> {
  const {
    preCommand = '',
  } = options;

  const commandString = [
    preCommand,
    'git',
    gitCommand,
  ].join(' ');

  const { stderr, stdout } = await execAsync(commandString, {});
  if (stderr) {
    return Promise.reject(stderr)
  }
  return stdout.trim();
}
