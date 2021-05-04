import fs from 'fs';
import path from 'path';
import yaml from 'yaml';
import type { JsonMap } from '@skypilot/common-types';
import { findPackageFileDir } from '@skypilot/sugarbowl';

interface ReadOptionsFileOptions {
  pathToFile?: string;
}

export function readOptionsFile(options: ReadOptionsFileOptions = {}): JsonMap {
  const {
    pathToFile = path.resolve(findPackageFileDir(), '.skypilot/quick-release.yaml'),
  } = options;
  if (fs.existsSync(pathToFile)) {
    const fileContents = fs.readFileSync(pathToFile, { encoding: 'utf-8' } );
    return yaml.parse(fileContents);
  }
  return {};
}
