import { readPackageFile } from '../common/packageFile/readPackageFile';

export function getCurrentVersion(): string {
  return readPackageFile().version as string;
}
