import { Player, SlotValue } from '@/shared/recoil';
import { isOwnersRoom } from './is-owner-room';
import { isEmptyRoom } from './is-empty-room';

export function getUpdatedSlots(
  playerSlots: SlotValue[],
  type: 'reduce' | 'fill' | 'increase',
  player?: Player
): SlotValue[] {
  switch (type) {
    //* 가족 구성원 수만큼 방 채우기
    case 'fill': {
      if (player === undefined) {
        return [...playerSlots];
      }

      let cnt = 0;
      //* 1. 주인 있는 방 먼저 채우기
      playerSlots.forEach((slot, index) => {
        if (isOwnersRoom(slot)) {
          playerSlots[index] = {
            ...slot,
            count: 1,
          };
          cnt++;
        }
      });
      // 추가된 구성원이 없으면 그대로 리턴
      if (cnt === player.farmer) return [...playerSlots];

      //* 2. 주인 없는 방에 새로운 구성원 채우기
      playerSlots.some((slot, index) => {
        if (cnt === player.farmer) return true;
        // 주인 없는 방
        if (isEmptyRoom(slot)) {
          playerSlots[index] = {
            ...slot,
            resource: '사람',
            count: 1,
          };
          cnt++;
        }
        return false;
      });
      // 모든 구성원을 채웠으면 리턴
      if (cnt === player.farmer) return [...playerSlots];

      //* 3. 급한 가족 늘리기로 구성원을 추가한 경우
      playerSlots.some((slot, index) => {
        if (isOwnersRoom(slot) && slot.count === 1) {
          playerSlots[index] = {
            ...slot,
            count: 2,
          };
          return true;
        }
        return false;
      });

      return [...playerSlots];
    }

    //* 가족 구성원 추가하기
    case 'increase':
      playerSlots.some((slot, index) => {
        // 주인이 없는 방이 존재하는 경우에만
        if (isEmptyRoom(slot)) {
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
        if (isOwnersRoom(slot) && slot.count > 0) {
          playerSlots[index] = {
            ...slot,
            count: slot.count - 1,
          };
          return true;
        }
      });
      return [...playerSlots];
    default:
      return [...playerSlots];
  }
}
