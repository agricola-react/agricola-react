import { SlotValue } from '@/shared/recoil';

export function isOwnersRoom(slot: SlotValue) {
  return slot.type === '방' && slot.resource === '사람';
}
