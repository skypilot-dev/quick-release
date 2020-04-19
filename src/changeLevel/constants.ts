interface CommitTypeDef {
  changeLevel: ChangeLevel;
  description: string;
  heading: string;
  name: string;
  prefixes: string[];
}

export enum ChangeLevel {
  none,
  patch,
  minor,
  major,
}

export const COMMIT_TYPE_DEFS: CommitTypeDef[] = [
  {
    name: 'breaking-change',
    heading: 'breaking changes',
    changeLevel: ChangeLevel.major,
    description: "changes to the project's interface that may be incompatible with previous use",
    prefixes: ['CHG!', 'DROP!', 'MAJOR', 'MAJOR!'],
  },
  {
    name: 'feature',
    heading: 'features',
    changeLevel: ChangeLevel.minor,
    description: 'feature additions or modifications that do not introduce breaking changes',
    prefixes: ['add', 'chg', 'drop', 'feat', 'ft', 'minor'],
  },
  {
    name: 'fix',
    changeLevel: ChangeLevel.patch,
    description: 'bug fixes',
    heading: 'fixes',
    prefixes: ['bug', 'fix', 'patch'],
  },
  {
    name: 'util',
    changeLevel: ChangeLevel.patch,
    description: 'internal features available in development',
    heading: 'internal features',
    prefixes: ['util'],
  },
  {
    name: 'task',
    changeLevel: ChangeLevel.patch,
    description: 'bug fixes, configuration changes, and code improvements that do not change behavior',
    heading: 'refactoring',
    prefixes: ['chore', 'refactor', 'task'],
  },
  {
    name: 'non-code',
    changeLevel: ChangeLevel.none,
    description: 'non-code changes such as reformatting and documentation improvements',
    heading: 'documentation & code style',
    prefixes: ['data', 'docs', 'style'],
  },
];
