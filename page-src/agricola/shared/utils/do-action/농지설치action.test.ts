/**
 * @jest-environment jsdom
 */

import { FIELD } from '@/shared/constants/field';
import { INIT_PLAYER, Player } from '@/shared/recoil';
import { 농지설치action } from './농지설치action';
import { get농지설치AlertMsg } from '@/shared/constants/alert';
import { EMPTY } from '@/shared/constants/empty';
import { COL, ROW } from '@/shared/constants';

const EMPTY_BOARD = new Array(ROW * COL).fill({
  type: null,
  resource: null,
  count: 0,
});

const FILED_INDEX = COL - 1;
const NEAR_INDEX = FILED_INDEX - 1;
const NOT_NEAR_INDEX = FILED_INDEX + 1;

describe('농지설치action - 예외', () => {
  it('농지가 이미 존재하는 경우 기존 농지와 인접하지 않은 위치에는 설치할 수 없습니다.', () => {
    // given
    const player = { ...INIT_PLAYER };
    player.slots = player.slots.map((_, index) => {
      if (index === FILED_INDEX) return FIELD;
      return EMPTY;
    });
    const spy = jest.spyOn(window, 'alert').mockImplementation(() => null);

    // when
    const resultPlayer = 농지설치action(player, NOT_NEAR_INDEX);

    // then
    expect(resultPlayer).toBeNull();
    expect(spy).toHaveBeenCalledWith(get농지설치AlertMsg());
  });
});

describe('농지설치action', () => {
  let player: Player;

  // setup & reset
  beforeEach(() => {
    player = { ...INIT_PLAYER };
    player.slots = EMPTY_BOARD;
  });

  it('농지가 존재하지 않는 경우 농지가 설치됩니다.', () => {
    // given
    const INDEX = 4;

    // when
    const resultPlayer = 농지설치action(player, INDEX);

    // then
    expect(resultPlayer).not.toBeNull();
    expect(resultPlayer?.slots[INDEX].type).toBe('밭');
  });

  it('농지가 이미 존재하는 경우 기존 농지와 인접할 때 설치됩니다.', () => {
    // given
    player.slots[FILED_INDEX] = FIELD;

    // when
    const resultPlayer = 농지설치action(player, NEAR_INDEX);

    // then
    expect(resultPlayer).not.toBeNull();
    expect(resultPlayer?.slots[NEAR_INDEX].type).toBe('밭');
  });
});
