const arrayRemove = (arr: any, value: any) => arr.filter((element: any) => element !== value);

const round = (value: number): number => Math.round(value * 100) / 100;

const roundPercentage = (value: string): string => {
  const float = parseFloat(value);
  const rounded = round(float);
  return `${rounded}%`;
};

export { arrayRemove, round, roundPercentage };
