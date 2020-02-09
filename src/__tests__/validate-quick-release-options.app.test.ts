import { JsonObject, JsonValue } from '@skypilot/common-types';
import { getOrDefault, GetOrDefaultFunction } from '../common/functions/object/getOrDefault';
import { readOptionsFile } from '../options/readOptionsFile';

let releaseOptions: JsonObject;
let getOptionOrDefault: GetOrDefaultFunction<JsonValue>;

describe('readOptionsFile', () => {
  it('the quick-release.yml file should exist', () => {
    releaseOptions = readOptionsFile();
    getOptionOrDefault = getOrDefault(releaseOptions);
    expect(releaseOptions).toHaveProperty('version');
  });

  it('the quick-release.yml file should exist', () => {
    const version = getOptionOrDefault('version');
    expect(version).toBe(2);
  });
});
