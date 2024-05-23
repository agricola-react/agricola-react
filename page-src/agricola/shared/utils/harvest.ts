import { getHarvestAlertMsg } from '@/shared/constants/alert';
import { Player, SlotValue } from '@/shared/recoil';

function canHarvestField(slot: SlotValue) {
  return (
    slot.type === '밭' && (slot.resource === '곡식' || slot.resource === '채소') && slot.count > 0
  );
}

function getHarvestedSlot(slot: SlotValue): SlotValue {
  if (!canHarvestField(slot)) return slot;

  if (slot.count === 1) {
    return {
      ...slot,
      resource: null,
      count: 0,
    };
  }

  return {
    ...slot,
    count: slot.count - 1,
  };
}

/**
 * 플레이어에 대해 수확을 진행하고, 그 결과를 리턴하는 메서드
 * @param player - 플레이어
 */
export function harvest(player: Player): Player {
  const grain = player.slots.reduce((acc, cur) => {
    if (canHarvestField(cur) && cur.resource === '곡식') return acc + 1;
    return acc;
  }, player.grain);

  const vegetable = player.slots.reduce((acc, cur) => {
    if (canHarvestField(cur) && cur.resource === '채소') return acc + 1;
    return acc;
  }, player.vegetable);

  alert(getHarvestAlertMsg(player.name, grain - player.grain, vegetable - player.vegetable));

  const harvestedSlots = player.slots.map(slot => getHarvestedSlot(slot));

  return {
    ...player,
    slots: harvestedSlots,
    grain,
    vegetable,
  };
}
