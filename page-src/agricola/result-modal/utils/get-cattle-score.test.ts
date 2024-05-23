import { getCattleScore } from 'page-src/agricola/result-modal/utils/get-cattle-score';

describe(getCattleScore.name, () => {
  it('소가 0마리일 때 -1을 반환해야 합니다.', () => {
    expect(getCattleScore(0)).toBe(-1);
  });

  it('소가 1마리일 때 1을 반환해야 합니다.', () => {
    expect(getCattleScore(1)).toBe(1);
  });

  it('소가 2마리 또는 3마리일 때 2를 반환해야 합니다.', () => {
    expect(getCattleScore(2)).toBe(2);
    expect(getCattleScore(3)).toBe(2);
  });

  it('소가 4마리 또는 5마리일 때 3을 반환해야 합니다.', () => {
    expect(getCattleScore(4)).toBe(3);
    expect(getCattleScore(5)).toBe(3);
  });

  it('소가 6마리 이상일 때 4를 반환해야 합니다.', () => {
    expect(getCattleScore(6)).toBe(4);
    expect(getCattleScore(7)).toBe(4);
    expect(getCattleScore(10)).toBe(4);
  });
});
