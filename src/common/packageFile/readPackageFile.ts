import fs from 'fs';
import { JsonObject } from '@skypilot/common-types';
import { findUpTree } from '../filesystem/findUpTree';

interface ReadPackageFileOptions {
  pathToFile?: string;
}

/* Reads & returns a value from the project's package file. */
export function readPackageFile(options: ReadPackageFileOptions = {}): JsonObject {
  const {
    pathToFile = findUpTree('package.json'),
  } = options;
  const packageFileAsJson = fs.readFileSync(pathToFile, 'utf-8');
  return JSON.parse(packageFileAsJson);
}
