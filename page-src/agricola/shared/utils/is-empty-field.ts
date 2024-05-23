import { SlotValue } from '@/shared/recoil';

export function isEmptyField(slots: SlotValue[], index: number) {
  return slots[index].type === '밭' && slots[index].resource === null && slots[index].count === 0;
}
