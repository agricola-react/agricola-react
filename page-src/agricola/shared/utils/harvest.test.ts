/**
 * @jest-environment jsdom
 */

import { INIT_GRAIN, INIT_VEGETABLE } from '@/shared/constants/field';
import { INIT_PLAYER, Player, initBoard } from '@/shared/recoil';
import { harvest } from './harvest';
import { getHarvestAlertMsg } from '@/shared/constants/alert';

describe('harvest', () => {
  // 테스트를 위한 플레이어 객체
  let player: Player;

  // 각 테스트 전에 초기화
  beforeEach(() => {
    player = INIT_PLAYER;
    player.slots = initBoard;
  });

  it('수확할 농작물이 존재하는 경우 수확이 진행되고 플레이어 자원이 업데이트 되어야 합니다.', () => {
    // given: 특정 슬롯에 곡식과 채소를 설정
    player.slots = player.slots.map((slot, index) => {
      if (index === 3) return INIT_GRAIN;
      if (index === 4) return INIT_VEGETABLE;
      return slot;
    });
    const spy = jest.spyOn(window, 'alert').mockImplementation(() => null);

    // when: 수확 함수 호출
    const harvestedPlayer = harvest(player);

    // then: 경고 메시지와 플레이어 자원 업데이트 확인
    expect(spy).toHaveBeenCalledWith(getHarvestAlertMsg(player.name, 1, 1));
    expect(harvestedPlayer.grain).toEqual(1);
    expect(harvestedPlayer.vegetable).toEqual(1);
  });

  it('수확할 농작물이 존재하지 않는 경우 수확이 진행되지 않고 플레이어 자원이 업데이트 되면 안됩니다.', () => {
    // given: 플레이어 슬롯에 농작물이 없음
    const spy = jest.spyOn(window, 'alert').mockImplementation(() => null);

    // when: 수확 함수 호출
    const harvestedPlayer = harvest(player);

    // then: 경고 메시지와 플레이어 자원이 업데이트되지 않음을 확인
    expect(spy).toHaveBeenCalledWith(getHarvestAlertMsg(player.name, 0, 0));
    expect(harvestedPlayer.grain).toEqual(0);
    expect(harvestedPlayer.vegetable).toEqual(0);
  });

  it('주기에 따라 밭에 남은 농작물 수와 수확량이 바뀌어야 합니다.', () => {
    // given: 특정 슬롯에 곡식과 채소를 설정
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

    // 주기적으로 수확을 진행하면서 결과 확인
    let harvestingPlayer = player;
    PERIOD_RESULTS.forEach(result => {
      const harvestedPlayer = harvest(harvestingPlayer);
      // then: 경고 메시지와 플레이어 자원 업데이트 확인
      expect(spy).toHaveBeenCalledWith(
        getHarvestAlertMsg(player.name, result.grain, result.vegetable)
      );
      expect(harvestedPlayer.grain).toEqual(harvestingPlayer.grain + result.grain);
      expect(harvestedPlayer.vegetable).toEqual(harvestingPlayer.vegetable + result.vegetable);
      harvestingPlayer = harvestedPlayer;
    });
  });
});
