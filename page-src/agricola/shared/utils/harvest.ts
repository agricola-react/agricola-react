import { getHarvestAlertMsg } from '@/shared/constants/alert';
import { Player, SlotValue } from '@/shared/recoil';

/**
 * 주어진 슬롯이 수확 가능한지 확인하는 함수
 * @param slot - 슬롯 값
 * @returns 슬롯이 수확 가능한지 여부를 나타내는 boolean 값
 */
function canHarvestField(slot: SlotValue) {
  return (
    slot.type === '밭' && (slot.resource === '곡식' || slot.resource === '채소') && slot.count > 0
  );
}

/**
 * 주어진 슬롯에서 자원을 수확한 후의 상태를 반환하는 함수
 * @param slot - 슬롯 값
 * @returns 수확 후의 슬롯 값
 */
function getHarvestedSlot(slot: SlotValue): SlotValue {
  if (!canHarvestField(slot)) return slot;

  // 자원이 하나 남은 경우, 자원을 null로 설정하고 수량을 0으로 설정
  if (slot.count === 1) {
    return {
      ...slot,
      resource: null,
      count: 0,
    };
  }

  // 자원이 두 개 이상인 경우, 자원 수량을 1 감소
  return {
    ...slot,
    count: slot.count - 1,
  };
}

/**
 * 플레이어에 대해 수확을 진행하고, 그 결과를 리턴하는 메서드
 * @param player - 플레이어 객체
 * @returns 수확 후의 플레이어 객체
 */
export function harvest(player: Player): Player {
  // 곡식을 수확하고, 플레이어의 곡식 자원을 업데이트
  const grain = player.slots.reduce((acc, cur) => {
    if (canHarvestField(cur) && cur.resource === '곡식') return acc + 1;
    return acc;
  }, player.grain);

  // 채소를 수확하고, 플레이어의 채소 자원을 업데이트
  const vegetable = player.slots.reduce((acc, cur) => {
    if (canHarvestField(cur) && cur.resource === '채소') return acc + 1;
    return acc;
  }, player.vegetable);

  // 수확 결과를 사용자에게 알림
  alert(getHarvestAlertMsg(player.name, grain - player.grain, vegetable - player.vegetable));

  // 수확 후의 슬롯 상태를 생성
  const harvestedSlots = player.slots.map(slot => getHarvestedSlot(slot));

  // 업데이트된 플레이어 객체 반환
  return {
    ...player,
    slots: harvestedSlots,
    grain,
    vegetable,
  };
}
