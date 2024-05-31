export const getFenceScore = (fence: number) => {
  switch (fence) {
    case 0:
      return -1;
    case 1:
      return 1;
    case 2:
      return 2;
    case 3:
      return 3;
    default:
      return 4;
  }
};
