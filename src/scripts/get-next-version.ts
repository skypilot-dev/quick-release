#!/usr/bin/env node
import { getNextVersion } from 'src/version/getNextVersion';

getNextVersion().then((nextVersion: string) => console.log(nextVersion));
