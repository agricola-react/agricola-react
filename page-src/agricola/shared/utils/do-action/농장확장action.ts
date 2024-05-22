import { ROOM } from '@/shared/constants/room';
import { Player } from '@/shared/recoil';

/**
 * 농장확장 액션을 완료한 플레이어를 리턴하는 메서드
 * @param player
 * @param index - 선택한 슬롯의 위치 인덱스
 * @returns
 */
export function 농장확장action(player: Player, index: number): Player {
  const resource = player.roomType;
  if (player.reed < 2 || player[resource] < 5) {
    throw new Error('자원이 부족합니다.');
  }

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
