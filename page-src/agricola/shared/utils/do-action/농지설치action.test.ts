/**
 * @jest-environment jsdom
 */

import { FIELD } from '@/shared/constants/field';
import { INIT_PLAYER, Player } from '@/shared/recoil';
import { 농지설치action } from './농지설치action';
import { 농지예외Alert } from '@/shared/constants/alert';
import { EMPTY } from '@/shared/constants/empty';
import { COL, ROW } from '@/shared/constants';
import { MESSAGES } from '@/shared/constants/messages';

const isExistAtLeastOne = require('../is-exist-at-least-one');
const isNearPosition = require('../is-near-position');

const EMPTY_BOARD = new Array(ROW * COL).fill({
  type: null,
  resource: null,
  count: 0,
});

const FILED_INDEX = COL - 1;
const NEAR_INDEX = FILED_INDEX - 1;
const NOT_NEAR_INDEX = FILED_INDEX + 1;

describe('농지설치action - 예외', () => {
  let player: Player;

  // setup & reset
  beforeEach(() => {
    player = { ...INIT_PLAYER };
    player.slots = player.slots.map((_, index) => {
      if (index === FILED_INDEX) return FIELD;
      return EMPTY;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('농지가 이미 존재하는 경우 기존 농지와 인접하지 않은 위치에는 설치할 수 없습니다.', () => {
    // given
    const spy = jest.spyOn(window, 'alert').mockImplementation(() => null);
    isExistAtLeastOne.isExistAtLeastOne = jest.fn().mockReturnValue(true);
    isNearPosition.isNearPosition = jest.fn().mockReturnValue(false);

    // when
    const resultPlayer = 농지설치action(player, NOT_NEAR_INDEX);

    // then
    expect(resultPlayer).toBeNull();
    expect(spy).toHaveBeenCalledWith(농지예외Alert);
  });

  it('농지가 이미 존재하는 위치에는 농지를 설치할 수 없습니다.', () => {
    // given
    // when & then
    expect(() => {
      농지설치action(player, FILED_INDEX);
    }).toThrow(new Error(MESSAGES.WRONG_POSITION));
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
    isExistAtLeastOne.isExistAtLeastOne = jest.fn().mockReturnValue(false);

    // when
    const resultPlayer = 농지설치action(player, INDEX);

    // then
    expect(resultPlayer).not.toBeNull();
    expect(resultPlayer?.slots[INDEX].type).toBe('밭');
  });

  it('농지가 이미 존재하는 경우 기존 농지와 인접할 때 설치됩니다.', () => {
    // given
    player.slots[FILED_INDEX] = FIELD;
    isExistAtLeastOne.isExistAtLeastOne = jest.fn().mockReturnValue(true);
    isNearPosition.isNearPosition = jest.fn().mockReturnValue(true);

    // when
    const resultPlayer = 농지설치action(player, NEAR_INDEX);

    // then
    expect(resultPlayer).not.toBeNull();
    expect(resultPlayer?.slots[NEAR_INDEX].type).toBe('밭');
  });
});
