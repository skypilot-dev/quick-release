import fs from 'fs';
import { JsonObject } from '@skypilot/common-types';
import { findUpTree } from '../filesystem/findUpTree';

interface WritePackageFileOptions {
  pathToFile?: string;
}

export function writePackageFile(
  packageFileContent: JsonObject, options: WritePackageFileOptions = {}
): void {
  const stringifiedData = JSON.stringify(packageFileContent, undefined, 2);
  const {
    pathToFile = findUpTree('package.json'),
  } = options;
  fs.writeFileSync(pathToFile, `${stringifiedData}\n`);
}
