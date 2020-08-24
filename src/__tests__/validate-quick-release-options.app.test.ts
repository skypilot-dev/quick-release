import type { JsonMap, JsonValue } from '@skypilot/common-types';
import { getOrDefault, GetOrDefaultFunction } from '../common/functions/object/getOrDefault';
import { readOptionsFile } from '../options/readOptionsFile';

let getOption: GetOrDefaultFunction<JsonValue>;
let releaseOptions: JsonMap;

describe('readOptionsFile', () => {
  it('the quick-release.yaml file should exist', () => {
    releaseOptions = readOptionsFile();
    getOption = getOrDefault(releaseOptions);
    expect(releaseOptions).toHaveProperty('version');
  });

  it('the quick-release.yaml file should exist', () => {
    const version = getOption('version');
    expect(version).toBe(1);
  });
});
