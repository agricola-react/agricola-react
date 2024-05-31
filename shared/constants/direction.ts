export const DIRECTION = {
  상: 0,
  하: 1,
  좌: 2,
  우: 3,
} as const;

export type DirectionKey = keyof typeof DIRECTION;

export type DirectionType = (typeof DIRECTION)[keyof typeof DIRECTION];
