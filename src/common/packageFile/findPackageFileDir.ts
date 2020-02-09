import * as path from 'path';
import { findUpTree } from '../filesystem/findUpTree';

/* Ascend the directory structure until the packgae file is found, then return its containing
 * directory; if it is not found, return an empty string. */
export function findPackageFileDir(): string {
  const pathToPackageFile = findUpTree('package.json');
  return path.dirname(pathToPackageFile);
}
