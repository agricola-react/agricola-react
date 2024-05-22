import { MESSAGES } from '@/shared/constants/messages';
import { ROOM } from '@/shared/constants/room';
import { Player } from '@/shared/recoil';
import { isNearPosition } from '../is-near-position';
import { get농장확장AlertMsg } from '@/shared/constants/alert';

/**
 * 농장확장 액션을 완료한 플레이어를 리턴하는 메서드
 * @param player
 * @param index - 선택한 슬롯의 위치 인덱스
 * @returns
 */
export function 농장확장action(player: Player, index: number): Player | null {
  const resource = player.roomType;
  if (player.reed < 2 || player[resource] < 5) {
    throw new Error(MESSAGES.LACK_RESOURCE);
  }

  if (isNearPosition(player.slots, index, '방')) {
    return {
      ...player,
      reed: player.reed - 2,
      [resource]: player[resource] - 5,
      slots: player.slots.map((value, idx) => {
        if (idx === index) return { ...ROOM };
        return value;
      }),
    };
  }

  alert(get농장확장AlertMsg());
  return null;
}
