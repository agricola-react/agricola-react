import { FenceType, Player, StockInfo } from '@/shared/recoil';
import { calculateFenceTotalMax } from '../calculate-fence-total-max';

export function 가축추가action(
  player: Player,
  index: number,
  stockInfo: StockInfo,
  fenceId?: number
): Player | null {
  //* 1. 예외
  //? 울타리가 존재하지 않는 경우
  if (fenceId === undefined) {
    //? 1. 외양간만 존재하는 경우
    if (player.slots[index].barn) {
      // TODO
      return player;
    }
    //? 2. 빈 땅인 경우
    alert(`[가축 추가] 가축을 데려오려면 외양간 혹은 울타리가 존재해야 합니다.`);
    return null;
  }

  const fenceInfo = player.ownedFence.find(fenceInfo => fenceInfo.id === fenceId) as FenceType;
  if (fenceInfo.animalType !== null && fenceInfo.animalType !== stockInfo.type) {
    alert(`[가축 추가] 하나의 울타리에는 동일한 가축만 키울 수 있습니다.`);
    return null;
  }
  //* =====

  //* 2. 검증
  let ownedFence = [...player.ownedFence];
  //? 비어있는 울타리의 경우 가축 종류 추가
  if (fenceInfo.animalType === null) {
    ownedFence = ownedFence.map(fence => {
      if (fence.id === fenceId)
        return {
          ...fence,
          animalType: stockInfo.type,
        };
      return {
        ...fence,
      };
    });
  }
  // 동일한 울타리 영역의 슬롯들
  const sameFenceSlots = player.slots.filter(slot => slot.fenceId === fenceId);
  // 울타리에 있는 가축 수
  const sameFenceTotalCount = sameFenceSlots.reduce((acc, slot) => acc + slot.count, 0);
  // 울타리에 수용 가능한 최대 가축 수
  const fenceTotalMax = calculateFenceTotalMax(player.slots, fenceId);
  // 울타리 내의 각 슬롯마다 수용 가능한 최대 가축 수
  const singleFenceMax = Math.floor(fenceTotalMax / sameFenceSlots.length);

  //? 예외처리
  if (sameFenceTotalCount === fenceTotalMax) {
    alert(`[가축 추가] 울타리가 가득 찼습니다.`);
    return null;
  }
  //* =====

  //* 계산
  let remain = stockInfo.count;
  const updatedSlots = player.slots.map(slot => {
    // 가축이 아직 남아있고, 현재 슬롯과 동일한 울타리인 경우
    if (remain > 0 && slot.fenceId === fenceId) {
      if (slot.count < singleFenceMax) {
        let plus = Math.min(remain, singleFenceMax - slot.count);
        remain -= plus;
        return {
          ...slot,
          count: slot.count + plus,
        };
      }
    }
    return slot;
  });
  //* =====

  return {
    ...player,
    slots: updatedSlots,
    ownedFence,
  };
}
