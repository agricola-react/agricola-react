import { initBoard } from '@/shared/recoil';
import { isExistEmptyField } from './is-exist-empty-field';
import { FIELD, INIT_GRAIN, INIT_VEGETABLE } from '@/shared/constants/field';

const FIELD_POS = [0, initBoard.length - 1];
const GRAIN_POS = [1, initBoard.length - 2];
const VEG_POS = [2, initBoard.length - 3];

describe('isExistEmptyField - 정상 케이스', () => {
  it('빈 밭이 하나라도 존재하는 경우 true를 리턴해야 합니다.', () => {
    // given
    const slots = initBoard.map((slot, index) => {
      if (FIELD_POS.includes(index)) return FIELD;
      return slot;
    });
    // when
    const result = isExistEmptyField(slots);
    // then
    expect(result).toBeTruthy();
  });

  it('밭이 존재하지 않는 경우 false를 리턴해야 합니다.', () => {
    // given
    const slots = [...initBoard];
    // when
    const result = isExistEmptyField(slots);
    // then
    expect(result).toBeFalsy();
  });

  it('곡식이 심어진 밭이 존재하는 경우 false를 리턴해야 합니다.', () => {
    // given
    const slots = initBoard.map((slot, index) => {
      if (GRAIN_POS.includes(index)) return INIT_GRAIN;
      return slot;
    });
    // when
    const result = isExistEmptyField(slots);
    // then
    expect(result).toBeFalsy();
  });

  it('채소가 심어진 밭이 존재하는 경우 false를 리턴해야 합니다.', () => {
    // given
    const slots = initBoard.map((slot, index) => {
      if (VEG_POS.includes(index)) return INIT_VEGETABLE;
      return slot;
    });
    // when
    const result = isExistEmptyField(slots);
    // then
    expect(result).toBeFalsy();
  });
});
