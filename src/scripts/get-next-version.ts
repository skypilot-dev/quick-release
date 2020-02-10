#!/usr/bin/env node
import { getNextVersion } from '../version/getNextVersion';

getNextVersion().then((nextVersion: string) => console.log(nextVersion));
