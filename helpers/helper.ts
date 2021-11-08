const TenMinutes = 600000;

const arrayRemove = (arr: any, value: any) => arr.filter((element: any) => element !== value);

const round = (value: number): number => Math.round(value * 100) / 100;

const roundPercentage = (value: string): string => {
  const float = parseFloat(value);
  const rounded = round(float);
  return `${rounded}%`;
};

// If we last updated the stock a long time ago return true
const dataNeedsUpdate = (date: number) => {
  const timeDiff = Date.now() - date;
  if (timeDiff > TenMinutes * 3) {
    return true;
  }
  return false;
};

export {
  arrayRemove, round, roundPercentage, dataNeedsUpdate,
};
