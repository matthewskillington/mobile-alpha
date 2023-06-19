export const mergeArrayWithoutDuplicates = (array1: Array<any>, array2: Array<any>) => {
  const merged = [...array1];
  array2.forEach((item) => {
    if (!merged.includes(item)) {
      merged.push(item);
    }
  });
  return merged;
};
