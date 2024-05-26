import { FIELD } from '@/shared/constants/field';
import { Player } from '@/shared/recoil';
import { isExistAtLeastOne } from '../is-exist-at-least-one';
import { isNearPosition } from '../is-near-position';
import { get농지설치AlertMsg } from '@/shared/constants/alert';
import { MESSAGES } from '@/shared/constants/messages';

/**
 * 농지 설치 액션을 완료한 플레이어를 리턴하는 메서드
 * @param player
 * @param index - 농지 설치 위치
 * @returns
 */
export function 농지설치action(player: Player, index: number): Player | null {
  if (player.slots[index].type === '밭') {
    throw new Error(MESSAGES.WRONG_POSITION);
  }

  if (!isExistAtLeastOne(player.slots, '밭') || isNearPosition(player.slots, index, '밭')) {
    return {
      ...player,
      slots: player.slots.map((slot, idx) => {
        if (idx === index) return FIELD;
        return slot;
      }),
    };
  }
  alert(get농지설치AlertMsg());
  return null;
}
