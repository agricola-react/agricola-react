import { SlotValue } from '@/shared/recoil';
import { SlotType } from 'page-src/agricola/player-board/player-board.sub/slot';

/**
 * 플레이어 보드에 주어진 타입이 하나라도 존재하는지 검증하는 메서드
 * @param slots - 플레이어 보드
 * @param type - 찾고자 하는 슬롯 타입
 */
export function isExistAtLeastOne(slots: SlotValue[], type: SlotType) {
  return slots.some(slot => {
    if (slot.type === type) return true;
    return false;
  });
}
