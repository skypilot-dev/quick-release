# @skypilot/quick-release

[![build](https://img.shields.io/github/workflow/status/skypilotcc/quick-release/Stable%20release?label=build)]()&nbsp;
[![npm stable](https://img.shields.io/npm/v/@skypilot/quick-release//www.npmjs.com/package/@skypilot/quick-release)&nbsp;
[![npm next](https://img.shields.io/npm/v/@skypilot/quick-release/next?label=next)](https://www.npmjs.com/package/@skypilot/quick-release)&nbsp;
[![license: ISC](https://img.shields.io/badge/license-ISC-blue.svg)](https://opensource.org/licenses/ISC)  

Automatic generator of version numbers for releases & prereleases

## What does it do

Quick Release analyzes a project's version number, commit history, and version tags to determine
the version to use for the next release.

## How to install

```bash
$ yarn add --dev @skypilot/quick-release
# or
$ npm add --save-dev @skypilot/quick-release
```

## How to use

Quick Release exposes four commands:

- `bump-version`: Computes the next version number for your project and writes it to `package.json`

- `get-current-version`: Displays your project's current version number from `package.json`

- `get-next-version`: Computes the next version number for your project and displays it to
standard output

- `is-published VERSION_STRING`: Returns true if the version has been published, otherwise false

- `spqr-option KEY`: Returns the value mapped to a key in the `.skypilot/quick-release.yml` options
file. If no value is set there, it defaults to the value in the
[defaults file](src/scripts/quick-release.defaults.yml).

See the files in `.github/workflows` in this repo for examples of how to use Quick Release in a
GitHub Actions workflow (Quick Release is used for its own releases).

## Default prefixes

- Major change (X.x.x): `CHG, DROP, MAJOR` (with optional trailing exclamation point)
- Minor change (x.X.x): `add, feat, minor`
- Patch change (x.x.X):
  - Fixes: `bug, fix, patch`
  - Refactoring: `chore, refactor, task`
  - Internal features: `util`
  - Other: _no prefix_
- No change (patch change if released):  
  - Documentation & code style: `docs, style`

These values will soon be customizable.

## How to customize

Quick Release checks for a configuration file at `.skypilot/quick-release.yml` in your project's
root directory; the settings in that file can be used to customize Quick Release's behaviour.
See the [defaults file](src/scripts/quick-release.defaults.yml) for available settings.

### Advanced API

The library also exposes the following functions:

- `getCoreVersion(): string`
- `getCurrentVersion(): string`
- `parseMessageChangeLevel(message: string): ChangeLevel`
- `parseMessagesChangeLevel(messages: string[]): ChangeLevel`

### Coming soon

These features are slated for development in the near future:

- Changelog generation
- Automated creation of GitHub Releases
