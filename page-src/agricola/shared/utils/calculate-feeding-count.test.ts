import { calculateFeedingCount } from 'page-src/agricola/shared/utils/calculate-feeding-count';

describe('calculateFeedingCount', () => {
  it('food가 충분할 때 food만 소모해야 합니다.', () => {
    const result = calculateFeedingCount({ farmer: 2, food: 5, grain: 3, vegetable: 2, baby: 1 });
    expect(result).toEqual({
      newFood: 0,
      newGrain: 3,
      newVegetable: 2,
      remainingFood: 0,
    });
  });

  it('food가 충분하지 않을 때 food와 grain을 소모해야 합니다.', () => {
    const result = calculateFeedingCount({ farmer: 2, food: 3, grain: 3, vegetable: 2, baby: 1 });
    expect(result).toEqual({
      newFood: 0,
      newGrain: 1,
      newVegetable: 2,
      remainingFood: 0,
    });
  });

  it('food와 grain이 충분하지 않을 때 food, grain, vegetable을 소모해야 합니다.', () => {
    const result = calculateFeedingCount({ farmer: 2, food: 1, grain: 2, vegetable: 2, baby: 1 });
    expect(result).toEqual({
      newFood: 0,
      newGrain: 0,
      newVegetable: 0,
      remainingFood: 0,
    });
  });

  it('food, grain, vegetable이 충분하지 않을 때 remainingFood를 반환해야 합니다.', () => {
    const result = calculateFeedingCount({ farmer: 2, food: 1, grain: 1, vegetable: 1, baby: 1 });
    expect(result).toEqual({
      newFood: 0,
      newGrain: 0,
      newVegetable: 0,
      remainingFood: 2,
    });
  });

  it('food, grain, vegetable이 모두 0일 때 처리해야 합니다.', () => {
    const result = calculateFeedingCount({ farmer: 2, food: 0, grain: 0, vegetable: 0, baby: 1 });
    expect(result).toEqual({
      newFood: 0,
      newGrain: 0,
      newVegetable: 0,
      remainingFood: 5,
    });
  });
});
