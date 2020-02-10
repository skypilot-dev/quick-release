import { parsePublishedVersions } from '../parsePublishedVersions';

describe('parseNpmVersions()', () => {
  it('should parse the version numbers from `yarn info ... versions`', () => {
    const yarnVersionsOutput = "['0.3.6', '0.3.7', '0.4.12-alpha' ]";
    const versionStrings = parsePublishedVersions(yarnVersionsOutput);
    expect(versionStrings).toEqual(['0.3.6', '0.3.7', '0.4.12-alpha'])
  });

  it('should parse multiline version numbers from `yarn info ... versions`', () => {
    const yarnVersionsOutput = `[
      '0.3.6',
      '0.3.7',
      '0.4.12-alpha'
    ]`;
    const versionStrings = parsePublishedVersions(yarnVersionsOutput);
    console.log('versionStrings:', versionStrings);
    expect(versionStrings).toEqual(['0.3.6', '0.3.7', '0.4.12-alpha'])
  });
});
