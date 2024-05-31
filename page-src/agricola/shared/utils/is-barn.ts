import { SlotValue } from '@/shared/recoil';

export function isBarn(slot: SlotValue) {
  return slot.barn !== undefined;
}
