export const getFieldScore = (field: number) => {
  switch (field) {
    case 0:
    case 1:
      return -1;
    case 2:
      return 1;
    case 3:
      return 2;
    case 4:
      return 3;
    default:
      return 4;
  }
};
