/* eslint-disable no-console */
import { getNextVersion } from '../version/getNextVersion';

getNextVersion().then((nextVersion: string) => console.log(nextVersion));
