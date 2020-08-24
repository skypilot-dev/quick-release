import type { GitTag } from '../types';
import { findTagByName } from './findTagByName';
import { retrieveTagNames } from './retrieveTagNames';

/* Return an array of selected details about tags in the current repo. */
export async function retrieveTags(): Promise<GitTag[]> {
  return await retrieveTagNames()
    .then((tagList: string[]) => Promise.all(
      tagList.map((tagName: string) => findTagByName(tagName) as Promise<GitTag>
      )
    ));
}
