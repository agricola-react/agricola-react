/**
 * @jest-environment jsdom
 */

import { INIT_GRAIN, INIT_VEGETABLE } from '@/shared/constants/field';
import { INIT_PLAYER, Player, initBoard } from '@/shared/recoil';
import { harvest } from './harvest';
import { getHarvestAlertMsg } from '@/shared/constants/alert';

describe('harvest', () => {
  // given
  let player: Player;

  // setup
  beforeEach(() => {
    player = INIT_PLAYER;
    player.slots = initBoard;
  });

  it('수확할 농작물이 존재하는 경우 수확이 진행되고 플레이어 자원이 업데이트 되어야 합니다.', () => {
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

  it('수확할 농작물이 존재하지 않는 경우 수확이 진행되지 않고 플레이어 자원이 업데이트 되면 안됩니다.', () => {
    // given
    const spy = jest.spyOn(window, 'alert').mockImplementation(() => null);

    // when
    const harvestedPlayer = harvest(player);

    // then
    expect(spy).toHaveBeenCalledWith(getHarvestAlertMsg(player.name, 0, 0));
    expect(harvestedPlayer.grain).toEqual(0);
    expect(harvestedPlayer.vegetable).toEqual(0);
  });

  it('주기에 따라 밭에 남은 농작물 수와 수확량이 바뀌어야 합니다.', () => {
    // given
    player.slots = player.slots.map((slot, index) => {
      if (index === 3) return INIT_GRAIN;
      if (index === 4) return INIT_VEGETABLE;
      return slot;
    });

    const spy = jest.spyOn(window, 'alert').mockImplementation(() => null);
    const PERIOD_RESULTS = [
      {
        grain: 1,
        vegetable: 1,
      },
      {
        grain: 1,
        vegetable: 1,
      },
      {
        grain: 1,
        vegetable: 0,
      },
      {
        grain: 0,
        vegetable: 0,
      },
    ] as const;

    // when
    let harvestingPlayer = player;
    PERIOD_RESULTS.forEach(result => {
      const harvestedPlayer = harvest(harvestingPlayer);
      // then
      expect(spy).toHaveBeenCalledWith(
        getHarvestAlertMsg(player.name, result.grain, result.vegetable)
      );
      expect(harvestedPlayer.grain).toEqual(harvestingPlayer.grain + result.grain);
      expect(harvestedPlayer.vegetable).toEqual(harvestingPlayer.vegetable + result.vegetable);
      harvestingPlayer = harvestedPlayer;
    });
  });
});
