import { COL, ROW } from '@/shared/constants';
import { isExistAtLeastOne } from './is-exist-at-least-one';
import { ROOM } from '@/shared/constants/room';
import { FIELD } from '@/shared/constants/field';
import { FENCE } from '@/shared/constants/fence';

const EMPTY_BOARD = new Array(ROW * COL).fill({
  type: null,
  resource: null,
  count: 0,
});

const ROOM_POS = [5];
const FIELD_POS = [6];
const FENCE_POS = [7];

describe('isExistAtLeastOne', () => {
  it('주어진 타입이 보드에 존재하지 않는다면 false를 리턴해야 합니다.', () => {
    //given
    const slots = [...EMPTY_BOARD];
    //when
    const resultRoom = isExistAtLeastOne(slots, '방');
    const resultField = isExistAtLeastOne(slots, '밭');
    const resultFence = isExistAtLeastOne(slots, '울타리');
    //then
    expect(resultRoom).toBeFalsy();
    expect(resultField).toBeFalsy();
    expect(resultFence).toBeFalsy();
  });

  it('[방]이 하나라도 존재하면 true를 리턴해야 합니다.', () => {
    //given
    let slots = EMPTY_BOARD.map((slot, index) => {
      if (ROOM_POS.includes(index)) return ROOM;
      return slot;
    });
    //when
    const result = isExistAtLeastOne(slots, '방');
    //then
    expect(result).toBeTruthy();
  });

  it('[밭]이 하나라도 존재하면 true를 리턴해야 합니다.', () => {
    //given
    let slots = EMPTY_BOARD.map((slot, index) => {
      if (FIELD_POS.includes(index)) return FIELD;
      return slot;
    });
    //when
    const result = isExistAtLeastOne(slots, '밭');
    //then
    expect(result).toBeTruthy();
  });

  it('[울타리]가 하나라도 존재하면 true를 리턴해야 합니다.', () => {
    let slots = EMPTY_BOARD.map((slot, index) => {
      if (FENCE_POS.includes(index)) return FENCE;
      return slot;
    });
    //when
    const result = isExistAtLeastOne(slots, '울타리');
    //then
    expect(result).toBeTruthy();
  });
});
