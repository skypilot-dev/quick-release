#!/usr/bin/env node
import { findUpTree, readPackageFile, writePackageFile } from '@skypilot/sugarbowl';
import { getNextVersion } from '../version/getNextVersion';

interface BumpVersionOptions {
  verbose: boolean;
}

async function bumpVersion({ verbose }: BumpVersionOptions): Promise<string> {
  const nextVersion = await getNextVersion({ verbose });
  const pathToFile = findUpTree('package.json');
  const content = readPackageFile({ pathToFile });
  content.version = nextVersion;

  writePackageFile({ content: content, pathToFile });
  return nextVersion;
}

const args = process.argv.slice(2);
const [option] = args;

bumpVersion({ verbose: ['--verbose', '-v'].includes(option) })
  .catch((e) => console.error(e.message));
