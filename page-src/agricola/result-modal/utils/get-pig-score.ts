export const getPigScore = (cow: number) => {
  switch (cow) {
    case 0:
      return -1;
    case 1:
    case 2:
      return 1;
    case 3:
    case 4:
      return 2;
    case 5:
    case 6:
      return 3;
    default:
      return 4;
  }
};
