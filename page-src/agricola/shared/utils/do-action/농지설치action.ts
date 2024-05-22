import { FIELD } from '@/shared/constants/field';
import { Player } from '@/shared/recoil';

/**
 * 농지 설치 액션을 완료한 플레이어를 리턴하는 메서드
 * @param player
 * @param index - 농지 설치 위치
 * @returns
 */
export function 농지설치action(player: Player, index: number) {
  return {
    ...player,
    slots: player.slots.map((slot, idx) => {
      if (idx === index) return FIELD;
      return slot;
    }),
  };
}
