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

Quick Release exposes three commands:

- `bump-version`: Computes the next version number for your project and writes it to `package.json`

- `get-current-version`: Displays your project's current version number from `package.json`

- `get-next-version`: Computes the next version number for your project and displays it to
standard output

## How it works

Quick Release 

## How to customize

\[To be added.\]

### Advanced API

The library also exposes the following functions:

- `getCoreVersion(): string`
- `getCurrentVersion(): string`
- `parseMessageChangeLevel(message: string): ChangeLevel`
- `parseMessagesChangeLevel(messages: string[]): ChangeLevel`
