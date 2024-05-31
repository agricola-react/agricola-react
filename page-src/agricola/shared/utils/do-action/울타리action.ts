import { FenceType, Player } from '@/shared/recoil';
import { getTwoDimensionBoard } from '../get-two-dimension-board';
import { COL } from '@/shared/constants';
import { DIRECTION, DirectionType } from '@/shared/constants/direction';
import { d, validatePosition } from '../is-near-position';

export function 울타리action(player: Player, selectedIndexArray: number[]): Player | null {
  //* 1. 새로 생성될 울타리의 id값 결정
  const fenceId =
    player.slots.reduce((acc, cur) => {
      if (cur.fenceId) return Math.max(acc, cur.fenceId);
      return acc;
    }, 0) + 1;
  const slotBoard = getTwoDimensionBoard(player.slots);

  let totalFence = 0; // 필요한 울타리 수
  let newFenceInfo: FenceType = {
    id: fenceId,
    animalType: null,
  };

  //* 2. 울타리 설치 검증 및 필요 울타리 수 구하기
  const resultSlots = [...player.slots];

  selectedIndexArray.forEach(position => {
    //* 2-1. 선택한 영역에 울타리가 없는 경우
    if (player.slots[position].fenceId === undefined) {
      const row = Math.floor(position / COL);
      const col = position % COL;
      const emptyDirections: DirectionType[] = [];

      d.forEach(({ dr, dc, key }) => {
        const next_row = row + dr;
        const next_col = col + dc;
        const next_index = next_row * COL + next_col;
        if (validatePosition(next_row, next_col)) {
          const next_slot = slotBoard[next_row][next_col];
          //? next position에 울타리가 없고, 선택 슬롯 목록에 존재하지 않는 경우
          if (next_slot.fenceId === undefined && !selectedIndexArray.includes(next_index)) {
            ++totalFence;
          }
          //? next position에 울타리가 이미 존재하거나 선택 슬롯 목록에 존재하는 경우
          else {
            emptyDirections.push(DIRECTION[key]); // 해당 부분에는 울타리를 설치하지 않음
          }
        }
        //? next position이 보드 외부인 경우
        else {
          ++totalFence;
        }
      });

      resultSlots[position] = {
        ...resultSlots[position],
        type: '울타리',
        resource: null,
        fenceId,
        emptyFenceDirections: emptyDirections,
      };
    }
  });

  //* 3. 자원 개수가 충분한지 확인한다.
  if (player.wood < totalFence) {
    alert(`[울타리 설치] 울타리가 부족합니다.`);
    return null;
  }

  return {
    ...player,
    fence: player.fence + totalFence,
    wood: player.wood - totalFence,
    slots: resultSlots,
    ownedFence: [...player.ownedFence, newFenceInfo],
  };
}
