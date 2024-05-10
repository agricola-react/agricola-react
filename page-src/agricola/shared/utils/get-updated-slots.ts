import { SlotValue } from '@/shared/recoil';

export function getUpdatedSlots(
  playerSlots: SlotValue[],
  type: 'reduce' | 'fill' | 'increase'
): SlotValue[] {
  switch (type) {
    case 'fill':
      return playerSlots.map(slot => {
        // 주인이 있는 방
        if (slot.type === '방' && slot.resource === '사람' && slot.count === 0)
          return {
            ...slot,
            count: 1,
          };
        return slot;
      });
    case 'increase':
      playerSlots.some((slot, index) => {
        // 주인이 없는 방이 존재하는 경우에만
        if (slot.type === '방' && slot.resource === null) {
          playerSlots[index] = {
            ...slot,
            resource: '사람',
            count: slot.count + 1,
          };
          return true;
        }
      });
      return [...playerSlots];
    case 'reduce':
      playerSlots.some((slot, index) => {
        // 주인이 있는 방 & 비어있지 않은 방이 있는 경우만
        if (slot.type === '방' && slot.resource === '사람' && slot.count > 0) {
          playerSlots[index] = {
            ...slot,
            count: 0,
          };
          return true;
        }
      });
      return [...playerSlots];
    default:
      return [...playerSlots];
  }
}
