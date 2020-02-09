import { retrieveTagNames } from '../retrieveTagNames';

describe('retrieveTagNames()', () => {
  it('should', async () => {
    const tagNames: string[] = await retrieveTagNames();
    if (tagNames.length > 0) {
      const [firstTagName] = tagNames;
      expect(typeof firstTagName).toBe('string');
    }
  });
});
