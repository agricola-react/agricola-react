import { EMPTY } from '@/shared/constants/empty';
import { ROOM } from '@/shared/constants/room';
import { INIT_PLAYER, initBoard } from '@/shared/recoil';
import { isNearPosition } from './validate-slot';
import { COL } from '@/shared/constants';
import { FIELD } from '@/shared/constants/field';

describe('인접 슬롯 검증 - 방', () => {
  // given
  const player = INIT_PLAYER;
  const roomPositions = [COL, 2 * COL]; // 좌측 맨 끝

  beforeEach(() => {
    player.slots = initBoard.map((_, index) => {
      if (roomPositions.includes(index)) return ROOM;
      return EMPTY;
    });
  });

  test('인접하는 경우', () => {
    roomPositions.forEach(pos => {
      const inputPos = pos + 1;
      // when
      const result = isNearPosition(player.slots, inputPos, '방');
      // then
      expect(result).toBeTruthy();
    });
  });

  test('인접하지 않는 경우', () => {
    roomPositions.forEach(pos => {
      // given
      const inputPos = pos - 1;
      // when
      const result = isNearPosition(player.slots, inputPos, '방');
      // then
      expect(result).toBeFalsy();
    });
  });
});

describe('인접 슬롯 검증 - 밭', () => {
  // given
  const player = INIT_PLAYER;
  const fieldPosition = [COL - 1, 2 * COL - 1]; // 우측 맨 끝

  beforeEach(() => {
    player.slots = initBoard.map((_, index) => {
      if (fieldPosition.includes(index)) return FIELD;
      return EMPTY;
    });
  });

  test('인접하는 경우', () => {
    fieldPosition.forEach(pos => {
      // given
      const inputPos = pos - 1;
      // when
      const result = isNearPosition(player.slots, inputPos, '밭');
      // then
      expect(result).toBeTruthy();
    });
  });

  test('인접하지 않는 경우', () => {
    fieldPosition.forEach(pos => {
      // given
      const inputPos = pos + 1;
      // when
      const result = isNearPosition(player.slots, inputPos, '밭');
      // then
      expect(result).toBeFalsy();
    });
  });
});
