import { getFieldScore } from 'page-src/agricola/result-modal/utils/get-field-score';

describe(getFieldScore, () => {
  it('밭이 0개 또는 1개일 때 -1을 반환해야 합니다.', () => {
    expect(getFieldScore(0)).toBe(-1);
    expect(getFieldScore(1)).toBe(-1);
  });

  it('밭이 2개일 때 1을 반환해야 합니다.', () => {
    expect(getFieldScore(2)).toBe(1);
  });

  it('밭이 3개일 때 2를 반환해야 합니다.', () => {
    expect(getFieldScore(3)).toBe(2);
  });

  it('밭이 4개일 때 3을 반환해야 합니다.', () => {
    expect(getFieldScore(4)).toBe(3);
  });

  it('밭이 5개 이상일 때 4를 반환해야 합니다.', () => {
    expect(getFieldScore(5)).toBe(4);
    expect(getFieldScore(6)).toBe(4);
    expect(getFieldScore(10)).toBe(4);
  });
});
