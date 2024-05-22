import { SlotValue } from '@/shared/recoil';

export function isEmptyRoom(slot: SlotValue) {
  return slot.type === '방' && slot.resource === null;
}
