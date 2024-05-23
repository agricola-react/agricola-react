/**
 * @jest-environment jsdom
 */

import { INIT_PLAYER, Player } from '@/shared/recoil';
import { 농장확장action } from './농장확장action';
import { MESSAGES } from '@/shared/constants/messages';
import { get농장확장AlertMsg } from '@/shared/constants/alert';

describe('농장확장action - 예외', () => {
  let player: Player;
  const CORRECT_INDEX = 0;

  //setup & reset
  beforeEach(() => {
    player = INIT_PLAYER;
  });

  it('필요 자원이 부족한 경우 오류가 발생해야 합니다.', () => {
    //given

    //when //then
    expect(() => {
      농장확장action(player, CORRECT_INDEX);
    }).toThrow(MESSAGES.LACK_RESOURCE);
  });

  it('기존 집과 인접하지 않은 곳에는 설치할 수 없습니다.', () => {
    //given
    player.reed = 2;
    player[player.roomType] = 5;
    const spy = jest.spyOn(window, 'alert').mockImplementation(() => null);
    //when
    const resultPlayer = 농장확장action(player, CORRECT_INDEX + 1);
    //then
    expect(spy).toHaveBeenCalledWith(get농장확장AlertMsg());
    expect(resultPlayer).toBeNull();
  });
});

describe('농장확장action', () => {
  const INDEX = 0;
  let player: Player;

  //setup & reset
  beforeEach(() => {
    player = { ...INIT_PLAYER };
    player.reed = 2;
    player[player.roomType] = 5;
  });

  it('농장확장이 종료되면 플레이어의 자원이 줄어야 합니다.', () => {
    //given
    const resource = player.roomType;
    //when
    const resultPlayer = 농장확장action(player, INDEX);
    //then
    expect(resultPlayer).not.toBeNull();
    expect(resultPlayer?.reed).toBe(player.reed - 2);
    resultPlayer !== null && expect(resultPlayer[resource]).toBe(player[player.roomType] - 5);
  });

  it('농장확장이 종료되면 선택한 위치에 방이 존재해야 합니다.', () => {
    //given

    //when
    const resultPlayer = 농장확장action(player, INDEX);
    //then
    expect(resultPlayer?.slots[INDEX].type).toBe('방');
  });
});
