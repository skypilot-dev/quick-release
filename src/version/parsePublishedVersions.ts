import * as fs from 'fs';

const NPM_RELEASES_FILEPATH = 'local/published-versions.txt';

export function parsePublishedVersions(text: string): string[] {
  const pattern = new RegExp("[^\\[ ',\\]]+", 'g');
  return text.match(pattern) || [];
}

/* Read from the file created by running
 *   `yarn info --silent <PACKAGE_NAME> versions) > local/npm-releases.js`
 * which saves an array string to */
export function readPublishedVersions(): string[] {
  if (fs.existsSync(NPM_RELEASES_FILEPATH)) {
    const yarnVersionsOutput = fs.readFileSync(NPM_RELEASES_FILEPATH, { encoding: 'utf-8' });
    return parsePublishedVersions(yarnVersionsOutput);
  }
  return [];
}
