const ISO_TIMESTAMP_FORMAT = 'format-local:%Y-%m-%dT%H:%M:%SZ';

export const PARSABLE_LOG_FORMAT = [
  `--date='${ISO_TIMESTAMP_FORMAT}'`,
  "--format='%H %cd %s'",
  '--no-color',
].join(' ');

export const PARSABLE_LOG_COMMAND = [
  'TZ=UTC',
  'git log',
  PARSABLE_LOG_FORMAT,
].join(' ');

export const PARSABLE_SHOW_COMMAND = [
  'TZ=UTC',
  'git show',
  PARSABLE_LOG_FORMAT,
].join(' ');
