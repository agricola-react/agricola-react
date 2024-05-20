interface Props {
  farmer: number;
  food: number;
  grain: number;
  vegetable: number;
  baby: number;
}

export const calculateFeedingCount = ({ farmer, food, grain, vegetable, baby }: Props) => {
  const feedingFoodCount = farmer * 2 + baby;

  let remainingFood = feedingFoodCount;
  let newFood = food;
  let newGrain = grain;
  let newVegetable = vegetable;

  // 우선 food 사용
  if (newFood >= remainingFood) {
    newFood -= remainingFood;
    remainingFood = 0;
  } else {
    remainingFood -= newFood;
    newFood = 0;
  }

  // food로 충분하지 않다면 grain 사용
  if (remainingFood > 0) {
    if (newGrain >= remainingFood) {
      newGrain -= remainingFood;
      remainingFood = 0;
    } else {
      remainingFood -= newGrain;
      newGrain = 0;
    }
  }

  // grain으로도 충분하지 않다면 vegetable 사용
  if (remainingFood > 0) {
    if (newVegetable >= remainingFood) {
      newVegetable -= remainingFood;
      remainingFood = 0;
    } else {
      remainingFood -= newVegetable;
      newVegetable = 0;
    }
  }

  return {
    newFood,
    newGrain,
    newVegetable,
    remainingFood,
  };
};
