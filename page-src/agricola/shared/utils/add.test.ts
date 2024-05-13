import { add } from 'page-src/agricola/shared/utils/add';

describe('add', () => {
  it('should add two numbers', () => {
    expect(add(1, 2)).toBe(3);
  });
});
