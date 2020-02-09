import { GitTag } from '../../types';
import { retrieveTagsAtHead } from '../retrieveTagsAtHead';

describe('retrieveTagsAtHead()', () => {
  it('should return an array', async () => {
    const tags: GitTag[] = await retrieveTagsAtHead();
    expect(Array.isArray(tags)).toBe(true);
    if (tags.length > 0) {
      const [firstTag] = tags;
      const { date, name } = firstTag;
      expect(date.toISOString()).toHaveLength(24);
      expect(typeof name).toBe('string');
    }
  });
});
