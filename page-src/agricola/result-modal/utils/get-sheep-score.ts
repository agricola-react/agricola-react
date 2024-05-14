export const getSheepScore = (sheep: number) => {
  switch (sheep) {
    case 0:
      return -1;
    case 1:
    case 2:
    case 3:
      return 1;
    case 4:
    case 5:
      return 2;
    case 6:
    case 7:
      return 3;
    default:
      return 4;
  }
};
