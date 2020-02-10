import { JsonObject, JsonValue } from '@skypilot/common-types';
import { getOrDefault, GetOrDefaultFunction } from '../common/functions/object/getOrDefault';
import { readOptionsFile } from '../options/readOptionsFile';

let getOption: GetOrDefaultFunction<JsonValue>;
let releaseOptions: JsonObject;

describe('readOptionsFile', () => {
  it('the quick-release.yml file should exist', () => {
    releaseOptions = readOptionsFile();
    getOption = getOrDefault(releaseOptions);
    expect(releaseOptions).toHaveProperty('version');
  });

  it('the quick-release.yml file should exist', () => {
    const version = getOption('version');
    expect(version).toBe(1);
  });
});
