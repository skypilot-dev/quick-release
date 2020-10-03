#!/usr/bin/env node
import path from 'path';
import { configureReadConfigValue } from '@skypilot/optio';
import { findPackageFileDir } from '@skypilot/sugarbowl';

const packageFileDir = findPackageFileDir();
const readOption = configureReadConfigValue({
  filepaths: [
    path.resolve(packageFileDir, 'local/quick-release.yaml'),
    path.resolve(packageFileDir, '.skypilot/quick-release.yaml'),
    path.resolve(__dirname, 'quick-release.defaults.yaml'),
  ],
});

{
  const args = process.argv.slice(2);
  const [objectPath] = args;

  const value = readOption(objectPath, { defaultValue: '' });
  console.log(value);
}
