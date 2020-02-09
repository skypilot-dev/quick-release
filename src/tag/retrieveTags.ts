/* -- Imports -- */
import { retrieveTagNames } from '@skypilot/nodegit-tools';
import { findTagByName } from '../git/tag/findTagByName';
import { GitTag } from './types';

/* -- Main function -- */
/* Return an array of selected details about tags in the current repo. */
export async function retrieveTags(): Promise<GitTag[]> {
  return await retrieveTagNames()
    .then((tagList: string[]) => Promise.all(
      tagList.map((tagName: string) => findTagByName(tagName) as Promise<GitTag>
      )
    ));
}
