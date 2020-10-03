import type { GitTag } from '../../types';
import { retrieveTags } from '../retrieveTags';

describe('retrieveTags()', () => {
  it('should return all tag records', async () => {
    const tags: GitTag[] = await retrieveTags();
    expect(Array.isArray(tags)).toBe(true);
    if (tags.length > 0) {
      const [firstTag] = tags;
      const { date, name } = firstTag;
      expect(date.toISOString()).toHaveLength(24);
      expect(typeof name).toBe('string');
    }
  });
});
