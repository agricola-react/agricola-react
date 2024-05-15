import { COL, ROW } from '@/shared/constants';
import { SlotValue } from '@/shared/recoil';

/**
 * 일차원 배열 형태의 slots를 이차원 배열로 변환하는 메서드
 * @param original
 * @returns
 */
export function getTwoDimensionBoard(original: SlotValue[]): SlotValue[][] {
  const result: SlotValue[][] = Array.from({ length: ROW }, (_, row) =>
    Array.from({ length: COL }, (_, col) => ({
      ...original[row * COL + col],
    }))
  );

  return result;
}
