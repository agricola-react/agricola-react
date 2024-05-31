import { SlotValue } from '@/shared/recoil';
import { isBarn } from './is-barn';

export function calculateFenceTotalMax(slots: SlotValue[], fenceId: number) {
  const fenceCount = slots.filter(slot => slot.fenceId === fenceId).length;
  const barnCount = slots.reduce((acc, slot) => {
    if (slot.fenceId === fenceId && isBarn(slot)) return acc + 1;
    return acc;
  }, 0);

  return 2 * fenceCount * Math.pow(2, barnCount);
}
