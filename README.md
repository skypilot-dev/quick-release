# @skypilot/quick-release

[![npm stable](https://img.shields.io/npm/v/@skypilot/quick-release?label=stable)](https://www.npmjs.com/package/@skypilot/quick-release)
![stable build](https://img.shields.io/github/workflow/status/skypilot-dev/quick-release/Stable%20release?label=stable%20build)
[![npm next](https://img.shields.io/npm/v/@skypilot/quick-release/next?label=next)](https://www.npmjs.com/package/@skypilot/quick-release)
![next build](https://img.shields.io/github/workflow/status/skypilot-dev/quick-release/Prerelease?branch=next&label=next%20build)
![Codacy grade](https://img.shields.io/codacy/grade/72ec3062267a473b8f8f27ea3a06d654)
![downloads](https://img.shields.io/npm/dm/@skypilot/quick-release)
[![license: ISC](https://img.shields.io/badge/license-ISC-blue.svg)](https://opensource.org/licenses/ISC)

Automatic generator of version numbers for releases & prereleases

## What it does

Quick Release analyzes a project's version number, commit history, and version tags to determine
the version to use for the next release.

## How it works

Quick Release analyzes the following data to determine the next version number:

- the current version in `package.json`
- the commit messages since the last stable-release tag
- release and prerelease version tags
- the branch name

The `master` branch is treated as the stable-release branch. A version bump on this branch
results in a new version number in the form `X.X.X` (example: `1.0.0`).

All other branches are treated as prerelease branches. A version bump on a prerelease branch
results in a new version number in the form `X.X.X-<BRANCH NAME>.X` (example: `1.0.0-beta.1`).

## How to install

```console
$ yarn add --dev @skypilot/quick-release
# or
$ npm add --save-dev @skypilot/quick-release
```

## How to use

Quick Release exposes six commands:

- `bump-version`: Computes the next version number for your project and writes it to
  `package.json`

- `get-current-version`: Displays your project's current version number from `package.json`

- `get-next-version`: Computes the next version number for your project and displays it to
   standard output

- `is-published VERSION`: Returns true if the version has been published, otherwise false

- `is-tagged VERSION` turns true if the version tag has been used, otherwise false

- `spqr-option KEY`: Returns the value mapped to a key in the `.skypilot/quick-release.yaml`
    options file. If no value is set there, it defaults to the value in the
    [defaults file](src/scripts/quick-release.defaults.yaml).

See the files in `.github/workflows` in this repo for examples of how to use Quick Release in a
GitHub Actions workflow (Quick Release is used for its own releases).

## Default prefixes

- Major change (X.x.x): `CHG!, DROP!, MAJOR, MAJOR!`
- Minor change (x.X.x): `add, chg, drop, feat, minor`
- Patch change (x.x.X):
  - Fixes: `bug, fix, patch`
  - Refactoring: `chore, refactor, task`
  - Internal features: `util`
  - Other: _no prefix_
- No change (patch change if released):  
  - Documentation & code style: `docs, style`

These values will soon be customizable.

## How to customize

Quick Release checks for a configuration file at `.skypilot/quick-release.yaml` in your project's
root directory; the settings in that file can be used to customize Quick Release's behaviour.
See the [defaults file](src/scripts/quick-release.defaults.yaml) for available settings.

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
