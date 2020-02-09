import { findTagByName } from '../findTagByName';
import { GitTag } from '../../../tag/types';


describe('findTagByName(tagName:string)', () => {
  it('should return the details of the tag', async () => {
    const tagRecord: GitTag | null = await findTagByName('be35c8a3a5c75d143c12a4a5e62e430500713bad');
    if (tagRecord) {
      expect(tagRecord).toHaveProperty('date');
      expect(tagRecord).toHaveProperty('name');
      expect(tagRecord).toHaveProperty('sha');
    }
  });
});
