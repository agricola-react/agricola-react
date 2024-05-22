import { COL, ROW } from '@/shared/constants';
import { getTwoDimensionBoard } from './get-two-dimension-board';
import { SlotType } from 'page-src/agricola/player-board/player-board.sub/slot';
import { SlotValue } from '@/shared/recoil';
import { WRONG_POSITION } from '@/shared/constants/messages/select-slot-error';

const d = [
  { dr: -1, dc: 0 },
  { dr: 1, dc: 0 },
  { dr: 0, dc: -1 },
  { dr: 0, dc: 1 },
];

function validatePosition(row: number, col: number) {
  return row >= 0 && row < ROW && col >= 0 && col < COL;
}
/**
 * 플레이어에 보드에서 선택한 위치가 주어진 슬롯 타입과 일치하는지 검증
 * @param slots - 플레이어 보드 (slots)
 * @param slotIndex - 플레이어 보드 내 선택한 슬롯의 위치 인덱스
 * @param slotType - 선택한 슬롯의 타입
 */
export function isNearPosition(slots: SlotValue[], slotIndex: number, slotType: SlotType) {
  if (slots[slotIndex].type === slotType) {
    throw new Error(WRONG_POSITION);
  }

  const board = getTwoDimensionBoard(slots);
  const slotRow = Math.floor(slotIndex / COL);
  const slotCol = slotIndex % COL;

  return d.some(({ dr, dc }) => {
    const row = slotRow + dr;
    const col = slotCol + dc;
    if (validatePosition(row, col) && board[row][col].type === slotType) {
      return true;
    }
    return false;
  });
}
