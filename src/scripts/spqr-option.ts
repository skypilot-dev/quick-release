#!/usr/bin/env node
import * as path from 'path';
import { readOptionsFile } from '../options/readOptionsFile';
import { getOrDefault } from '../common/functions/object/getOrDefault';

function readOption<T>(objectPath: string): T | '' {
  const releaseOptions = readOptionsFile();
  const pathToDefaultOptionsFile = path.resolve(__dirname, 'quick-release.defaults.yml');
  const defaultOptions = readOptionsFile({ pathToFile: pathToDefaultOptionsFile });
  const value = getOrDefault(
    releaseOptions,
    objectPath,
    getOrDefault(defaultOptions, objectPath)
  );
  return value === undefined ? '' : value;
}

{
  const args = process.argv.slice(2);
  const [objectPath] = args;

  const value = readOption(objectPath) || '';
  console.log(value);
}
