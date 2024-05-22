import { EMPTY } from '@/shared/constants/empty';
import { ROOM } from '@/shared/constants/room';
import { INIT_PLAYER, initBoard } from '@/shared/recoil';
import { COL } from '@/shared/constants';
import { FIELD } from '@/shared/constants/field';
import { isNearPosition } from './is-near-position';

describe('isNearPosition(방)', () => {
  // given
  const player = INIT_PLAYER;
  const roomPositions = [COL, 2 * COL]; // 좌측 맨 끝

  beforeEach(() => {
    player.slots = initBoard.map((_, index) => {
      if (roomPositions.includes(index)) return ROOM;
      return EMPTY;
    });
  });

  it('입력 위치가 방에 인접하는 경우 true를 리턴해야 합니다.', () => {
    roomPositions.forEach(pos => {
      // given
      const inputPos = pos + 1;
      // when
      const result = isNearPosition(player.slots, inputPos, '방');
      // then
      expect(result).toBeTruthy();
    });
  });

  it('입력 위치가 방에 인접하지 않는 경우 false를 리턴해야 합니다.', () => {
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

describe('isNearPosition(밭)', () => {
  // given
  const player = INIT_PLAYER;
  const fieldPosition = [COL - 1, 2 * COL - 1]; // 우측 맨 끝

  beforeEach(() => {
    player.slots = initBoard.map((_, index) => {
      if (fieldPosition.includes(index)) return FIELD;
      return EMPTY;
    });
  });

  it('입력 위치가 밭과 인접하는 경우 true를 리턴해야 합니다.', () => {
    fieldPosition.forEach(pos => {
      // given
      const inputPos = pos - 1;
      // when
      const result = isNearPosition(player.slots, inputPos, '밭');
      // then
      expect(result).toBeTruthy();
    });
  });

  it('입력 위치가 밭과 인접하지 않는 경우 false를 리턴해야 합니다.', () => {
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
