export const to2DArray = <T>(arr: T[], count: number) => {
  return arr.reduce((acc, item, idx) => {
    if (idx % count === 0) {
      acc.push([item]);
    } else {
      acc[acc.length - 1].push(item);
    }

    return acc;
  }, [] as T[][]);
};
