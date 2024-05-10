import { Player, SlotValue } from '@/shared/recoil';

export function getUpdatedSlots(
  playerSlots: SlotValue[],
  type: 'reduce' | 'fill' | 'increase',
  player?: Player
): SlotValue[] {
  switch (type) {
    //* 가족 구성원 수만큼 방 채우기
    case 'fill': {
      if (player === undefined) {
        console.error(`[${type}] player 파라미터가 필요합니다.`);
        return [...playerSlots];
      }
      // 전체 방
      const totalRoomCnt = playerSlots.reduce((acc, cur) => {
        if (cur.type === '방') return acc + 1;
        return acc;
      }, 0);

      if (totalRoomCnt < player.farmer) {
        console.error(`[${type}] 가족 구성원 수가 방 개수보다 많습니다.`);
        return [...playerSlots];
      }

      let cnt = 0;
      // 1. 주인 있는 방 먼저 채우기
      playerSlots.forEach((slot, index) => {
        if (slot.type === '방' && slot.resource === '사람') {
          playerSlots[index] = {
            ...slot,
            resource: '사람',
            count: 1,
          };
          cnt++;
        }
      });
      // 추가된 구성원이 없으면 그대로 리턴
      if (cnt === player.farmer) return [...playerSlots];
      // 2. 주인 없는 방에 새로운 구성원 채우기
      playerSlots.some((slot, index) => {
        if (cnt === player.farmer) return true;
        // 주인 없는 방
        if (slot.type === '방' && slot.resource === null) {
          playerSlots[index] = {
            ...slot,
            resource: '사람',
            count: 1,
          };
          cnt++;
        }
        return false;
      });

      return [...playerSlots];
    }

    //* 가족 구성원 추가하기
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

    //* 가족 구성원 하나를 보드에서 없애기
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
