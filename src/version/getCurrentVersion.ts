import { readPackageFile } from '@skypilot/sugarbowl';

export function getCurrentVersion(): string {
  return readPackageFile().version as string;
}
