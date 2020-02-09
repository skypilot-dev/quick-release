import fs from 'fs';
import path from 'path';
import yaml from 'yaml';
import { JsonObject } from '@skypilot/common-types';
import { findPackageFileDir } from '../common/packageFile/findPackageFileDir';

interface ReadOptionsFileOptions {
  pathToFile?: string;
}

export function readOptionsFile(options: ReadOptionsFileOptions = {}): JsonObject {
  const {
    pathToFile = path.resolve(findPackageFileDir(), '.skypilot/quick-release.yml'),
  } = options;
  const fileContents = fs.readFileSync(pathToFile, { encoding: 'utf-8'} );
  return yaml.parse(fileContents);
}
