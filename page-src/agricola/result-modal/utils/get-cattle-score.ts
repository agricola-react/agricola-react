export const getCattleScore = (cow: number) => {
  switch (cow) {
    case 0:
      console.log(cow, 'cow');
      return -1;
    case 1:
      return 1;
    case 2:
    case 3:
      return 2;
    case 4:
    case 5:
      return 3;
    default:
      return 4;
  }
};
