# @skypilot/bump-version

[![build](https://img.shields.io/github/workflow/status/skypilotcc/bump-version/Build%20&%20publish%20stable%20Node%20package?label=build)]()&nbsp;
[![npm](https://img.shields.io/npm/v/@skypilot/bump-version?label=npm)](https://www.npmjs.com/package/@skypilot/bump-version)&nbsp;
[![license: ISC](https://img.shields.io/badge/license-ISC-blue.svg)](https://opensource.org/licenses/ISC)  

Automatically bumps a project's version number

### Advanced API

The library also exposes the following functions:

- `getCoreVersion(): string`
- `getCurrentVersion(): string`
- `parseMessageChangeLevel(message: string): ChangeLevel`
- `parseMessagesChangeLevel(messages: string[]): ChangeLevel`
