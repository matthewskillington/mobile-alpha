import { mergeArrayWithoutDuplicates } from '../merge-array-without-duplicates';

describe('merge-array-without-duplicates', () => {
  it('should concat two arrays and return the value', () => {
    const array1 = [1, 2, 3];
    const array2 = [4, 5, 6];
    const result = mergeArrayWithoutDuplicates(array1, array2);
    expect(result.length).toBe(6);
    expect(result).toStrictEqual([1, 2, 3, 4, 5, 6]);

    const array3 = ['hello1', 'hello2'];
    const array4 = ['hello6', 'hello7'];
    const result2 = mergeArrayWithoutDuplicates(array3, array4);
    expect(result2.length).toBe(4);
    expect(result2).toStrictEqual(['hello1', 'hello2', 'hello6', 'hello7']);
  });

  it('should avoid duplicate values', () => {
    const array1 = ['hello1', 'hello2'];
    const array2 = ['hello6', 'hello1'];
    const result = mergeArrayWithoutDuplicates(array1, array2);
    expect(result.length).toBe(3);
    expect(result).toStrictEqual(['hello1', 'hello2', 'hello6']);
  });
});
