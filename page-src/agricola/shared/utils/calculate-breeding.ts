import { Player, SlotValue } from '@/shared/recoil';
import { calculateFenceTotalMax } from './calculate-fence-total-max';

export function calculateBreeding(player: Player): SlotValue[] | null {
  // 플레이어가 소유중인 울타리의 id값 배열
  const fenceIds = player.ownedFence.map(fence => fence.id);
  let resultSlots: SlotValue[] = [...player.slots];
  // 가축 추가가 완료된 울타리의 id값 배열
  const doneFenceIds: number[] = [];

  //* 1. 각 울타리 정보를 조회하여 번식을 진행한다.
  fenceIds.forEach(id => {
    // 동일한 울타리 영역의 슬롯들
    const sameFenceSlots = player.slots.filter(slot => slot.fenceId === id);
    // 울타리에 있는 가축 수
    const sameFenceTotalCount = sameFenceSlots.reduce((acc, slot) => acc + slot.count, 0);
    // 울타리에 수용 가능한 최대 가축 수
    const fenceTotalMax = calculateFenceTotalMax(player.slots, id);
    // 울타리 내의 각 슬롯마다 수용 가능한 최대 가축 수
    const singleFenceMax = Math.floor(fenceTotalMax / sameFenceSlots.length);

    if (sameFenceTotalCount === fenceTotalMax) {
      return null;
    }

    if (sameFenceTotalCount < 2) {
      return null;
    }

    resultSlots = player.slots.map(slot => {
      //? 해당 울타리에 가축 추가가 아직 진행되지 않았고, 현재 울타리와 동일한 울타리인 경우
      if (!doneFenceIds.includes(id) && slot.fenceId === id && slot.count < singleFenceMax) {
        doneFenceIds.push(id);
        return {
          ...slot,
          count: slot.count + 1,
        };
      }
      return slot;
    });
  });

  return resultSlots;
}
