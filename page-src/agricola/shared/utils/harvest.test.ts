/**
 * @jest-environment jsdom
 */

import { INIT_GRAIN, INIT_VEGETABLE } from '@/shared/constants/field';
import { INIT_PLAYER, initBoard } from '@/shared/recoil';
import { harvest } from './harvest';
import { getHarvestAlertMsg } from '@/shared/constants/alert';

describe('수확하기 기능 테스트', () => {
  // given
  const player = INIT_PLAYER;
  beforeEach(() => {
    player.slots = initBoard;
  });

  test('수확할 농작물이 존재하는 경우', () => {
    // given
    player.slots = player.slots.map((slot, index) => {
      if (index === 3) return INIT_GRAIN;
      if (index === 4) return INIT_VEGETABLE;
      return slot;
    });
    const spy = jest.spyOn(window, 'alert').mockImplementation(() => null);

    // when
    const harvestedPlayer = harvest(player);

    // then
    expect(spy).toHaveBeenCalledWith(getHarvestAlertMsg(player.name, 1, 1));
    expect(harvestedPlayer.grain).toEqual(1);
    expect(harvestedPlayer.vegetable).toEqual(1);
  });

  test('수확할 농작물이 존재하지 않는 경우', () => {
    // given
    const spy = jest.spyOn(window, 'alert').mockImplementation(() => null);

    // when
    const harvestedPlayer = harvest(player);

    // then
    expect(spy).toHaveBeenCalledWith(getHarvestAlertMsg(player.name, 0, 0));
    expect(harvestedPlayer.grain).toEqual(0);
    expect(harvestedPlayer.vegetable).toEqual(0);
  });
});

describe('수확하기 진행 테스트', () => {
  // given
  const player = INIT_PLAYER;
  beforeEach(() => {
    player.slots = player.slots.map((slot, index) => {
      if (index === 3) return INIT_GRAIN;
      if (index === 4) return INIT_VEGETABLE;
      return slot;
    });
  });

  test('주기 변화에 따른 수확 기능 테스트', () => {
    // given
    const spy = jest.spyOn(window, 'alert').mockImplementation(() => null);
    const WANT = [
      {
        period: 1,
        grain: 1,
        vegetable: 1,
      },
      {
        period: 2,
        grain: 1,
        vegetable: 1,
      },
      {
        period: 3,
        grain: 1,
        vegetable: 0,
      },
      {
        period: 4,
        grain: 0,
        vegetable: 0,
      },
    ] as const;

    // when
    let harvestedPlayer = player;
    WANT.forEach(result => {
      const _harvestedPlayer = harvest(harvestedPlayer);
      // then
      expect(spy).toHaveBeenCalledWith(
        getHarvestAlertMsg(player.name, result.grain, result.vegetable)
      );
      expect(_harvestedPlayer.grain).toEqual(harvestedPlayer.grain + result.grain);
      expect(_harvestedPlayer.vegetable).toEqual(harvestedPlayer.vegetable + result.vegetable);
      harvestedPlayer = _harvestedPlayer;
    });
  });
});
