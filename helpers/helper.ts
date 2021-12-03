const TenMinutes = 600000;

const arrayRemove = (arr: any, value: any) => arr.filter((element: any) => element !== value);

const round = (value: number): number => Math.round(value * 100) / 100;

const roundPercentage = (value: string): string => {
  const float = parseFloat(value);
  const rounded = round(float);
  return `${rounded}%`;
};

// If we last updated the stock a long time ago return true
const dataNeedsUpdate = (date: number, isGraphData?: boolean) => {
  const timeDiff = Date.now() - date;
  const timeThreshold = isGraphData ? TenMinutes * 144 : TenMinutes * 3;
  if (timeDiff > timeThreshold) {
    return true;
  }
  return false;
};

export {
  arrayRemove, round, roundPercentage, dataNeedsUpdate,
};
