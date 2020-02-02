/* eslint-disable no-underscore-dangle, @typescript-eslint/camelcase */

/* From https://github.com/nodegit/nodegit/issues/1679
 In order to patch Jest's Runtime class, we need to require it using NodeJS's `require` function,
 *not* the `require` function that is provided by Jest here. The reason is that using Jest's
 `require` will load the Runtime code a second time, so that we won't get a reference to the actual
 instance that needs to be patched. Since Jest does not expose any API to obtain the native NodeJS
 `require` function, we load the native 'module' module instead that allows us to create a native
 NodeJS `require` function. Mind is blown!
 */
const Module = require('module');
const nativeRequire = Module.createRequireFromPath(__filename);

const jestRuntime = nativeRequire('jest-runtime');

if (!jestRuntime.prototype.__nodegit_patched) {
  jestRuntime.prototype.__nodegit_patched = true;

  const originalRequireModule = jestRuntime.prototype.requireModule;
  jestRuntime.prototype.requireModule = function(_from, moduleName) {
    /* When requiring the 'nodegit' module, sidestep Jest's module system as it would cause NodeGit
     * to be loaded multiple times (once per test file), corrupting the bound functions to native
     * code. See https://github.com/facebook/jest/issues/3552 */
    if (moduleName === 'nodegit') {
      return nativeRequire('nodegit');
    }

    /* eslint-disable-next-line prefer-rest-params */
    return originalRequireModule.apply(this, arguments);
  };
}
