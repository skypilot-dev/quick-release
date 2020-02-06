# @skypilot/bump-version

[![build](https://img.shields.io/github/workflow/status/skypilotcc/bump-version/Stable%20release?label=build)]()&nbsp;
[![npm stable](https://img.shields.io/npm/v/@skypilot/bump-version?label=stable)](https://www.npmjs.com/package/@skypilot/bump-version)&nbsp;
[![npm next](https://img.shields.io/npm/v/@skypilot/bump-version/next?label=next)](https://www.npmjs.com/package/@skypilot/bump-version)&nbsp;
[![license: ISC](https://img.shields.io/badge/license-ISC-blue.svg)](https://opensource.org/licenses/ISC)  

Automatically bumps a project's version number

### Advanced API

The library also exposes the following functions:

- `getCoreVersion(): string`
- `getCurrentVersion(): string`
- `parseMessageChangeLevel(message: string): ChangeLevel`
- `parseMessagesChangeLevel(messages: string[]): ChangeLevel`
