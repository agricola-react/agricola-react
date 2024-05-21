import { SlotValue } from '@/shared/recoil';
import { isEmptyField } from './is-empty-field';

/**
 * 플레이어 보드에 비어있는 밭이 하나라도 존재하는지 검증하는 메서드
 * @param slots - 플레이어 보드
 * @returns
 */
export function isExistEmptyField(slots: SlotValue[]) {
  return slots.some((_, index) => isEmptyField(slots, index));
}
