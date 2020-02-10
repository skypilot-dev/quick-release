#!/usr/bin/env node
import { findUpTree } from '../common/filesystem/findUpTree';
import { readPackageFile } from '../common/packageFile/readPackageFile';
import { writePackageFile } from '../common/packageFile/writePackageFile';
import { getNextVersion } from '../version/getNextVersion';

interface BumpVersionOptions {
  verbose: boolean;
}

async function bumpVersion({ verbose }: BumpVersionOptions): Promise<string> {
  const nextVersion = await getNextVersion({ verbose });
  const pathToFile = findUpTree('package.json');
  const packageFileContent = readPackageFile({ pathToFile });
  packageFileContent.version = nextVersion;

  writePackageFile(packageFileContent, { pathToFile });
  return nextVersion;
}

const args = process.argv.slice(2);
const [option] = args;

bumpVersion({ verbose: ['--verbose', '-v'].includes(option) })
  .catch((e) => console.error(e.message));
