import { findUpTree } from '../common/filesystem/findUpTree';
import { readPackageFile } from '../common/packageFile/readPackageFile';
import { writePackageFile } from '../common/packageFile/writePackageFile';
import { getNextVersion } from '../version/getNextVersion';

async function bumpVersion(): Promise<string> {
  const nextVersion = await getNextVersion();
  const pathToFile = findUpTree('package.json');
  const packageFileContent = readPackageFile({ pathToFile });
  packageFileContent.version = nextVersion;

  writePackageFile(packageFileContent, { pathToFile });
  return nextVersion;
}

bumpVersion().catch((e) => console.error(e.message));
