interface CommitTypeDef {
  changeLevel: ChangeLevel;
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
    changeLevel: ChangeLevel.major,
    name: 'major',
    prefixes: ['chg!', 'drop!', 'major'],
  },
  {
    changeLevel: ChangeLevel.minor,
    name: 'minor',
    prefixes: ['add', 'feat', 'ft', 'minor'],
  },
  {
    changeLevel: ChangeLevel.patch,
    name: 'patch',
    prefixes: ['bug', 'fix', 'patch', 'refactor'],
  },
];
