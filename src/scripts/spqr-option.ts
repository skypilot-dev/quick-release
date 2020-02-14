#!/usr/bin/env node
import * as path from 'path';
import { readConfigFn } from '@skypilot/optio';
import { findPackageFileDir } from '@skypilot/sugarbowl';

const packageFileDir = findPackageFileDir();
const readOption = readConfigFn({
  filepaths: [
    path.resolve(packageFileDir, 'local/quick-release.yaml'),
    path.resolve(packageFileDir, '.skypilot/quick-release.yaml'),
    path.resolve(__dirname, 'quick-release.defaults.yaml'),
  ],
});

{
  const args = process.argv.slice(2);
  const [objectPath] = args;

  const value = readOption(objectPath, '');
  console.log(value);
}

