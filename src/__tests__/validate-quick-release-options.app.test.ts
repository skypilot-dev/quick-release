import type { JsonMap } from '@skypilot/common-types';
import { getOrDefault } from 'src/common/functions/object/getOrDefault';
import { readOptionsFile } from 'src/options/readOptionsFile';

let releaseOptions: JsonMap;

describe('readOptionsFile', () => {
  it('the quick-release.yaml file should exist', () => {
    releaseOptions = readOptionsFile();
    expect(releaseOptions).toHaveProperty('version');
  });

  it('the quick-release.yaml file should exist', () => {
    const version = getOrDefault(releaseOptions, 'version');
    expect(version).toBe(1);
  });
});
