const ISO_TIMESTAMP_FORMAT = 'format-local:%Y-%m-%dT%H:%M:%SZ';

export const PARSABLE_LOG_COMMAND = [
  'TZ=UTC',
  'git log',
  `--date='${ISO_TIMESTAMP_FORMAT}'`,
  "--format='%H %cd %s'",
  '--no-merges',
  '--no-color',
].join(' ');

