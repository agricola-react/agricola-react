import { RoomType } from 'page-src/agricola/player-board/player-board.sub/room';
import { ResourceType, SlotType } from 'page-src/agricola/player-board/player-board.sub/slot';
import { atom } from 'recoil';

export const roundState = atom({
  key: 'roundState',
  default: 1,
});

export const currentPlayerIndexState = atom({
  key: 'currentPlayerIndexState',
  default: 0,
});

export type SlotValue = {
  type: SlotType;
  resource: ResourceType;
  count: number;
};

const initBoard: SlotValue[] = new Array(15)
  .fill({
    type: null,
    resource: null,
    count: 0,
  })
  .map((value, index) => {
    if (index === 5 || index === 10) {
      return {
        type: '방',
        resource: '사람',
        count: 1,
      };
    }
    return value;
  });

export type Player = {
  number: number;
  name: string;
  color: string;
  // 첫번째 순서인지
  isFirst: boolean;
  // 자원
  wood: number;
  clay: number;
  stone: number;
  reed: number;
  grain: number;
  vegetable: number;
  food: number;
  // 가축
  sheep: number;
  pig: number;
  cattle: number;
  // 전체 사람수
  farmer: number;
  // 집에 있는 사람수
  homeFarmer: number;
  // 한번도 일하지 않은 베이비
  baby: number;
  // 울타리
  fence: number;
  // 외양간
  barn: number;
  // 구걸
  bagging: number;
  // 플레이어 보드
  slots: SlotValue[];
  // 집 종류
  roomType: RoomType;
};

export const playersState = atom<Player[]>({
  key: 'playersState',
  default: [
    {
      number: 1,
      name: '플레이어 1',
      color: 'red',
      isFirst: true,
      wood: 0,
      clay: 0,
      stone: 0,
      reed: 0,
      grain: 0,
      vegetable: 0,
      sheep: 0,
      pig: 0,
      cattle: 0,
      food: 0,
      farmer: 2,
      fence: 0,
      barn: 0,
      homeFarmer: 2,
      baby: 0,
      bagging: 0,
      slots: initBoard,
      roomType: 'wood',
    },
    {
      number: 2,
      name: '플레이어 2',
      color: 'green',
      isFirst: false,
      wood: 0,
      clay: 0,
      stone: 0,
      reed: 0,
      grain: 0,
      vegetable: 0,
      sheep: 0,
      pig: 0,
      cattle: 0,
      food: 0,
      farmer: 2,
      fence: 0,
      barn: 0,
      homeFarmer: 2,
      baby: 0,
      bagging: 0,
      slots: initBoard,
      roomType: 'wood',
    },
    {
      number: 3,
      name: '플레이어 3',
      color: '#00D8FF',
      isFirst: false,
      wood: 0,
      clay: 0,
      stone: 0,
      reed: 0,
      grain: 0,
      vegetable: 0,
      sheep: 0,
      pig: 0,
      cattle: 0,
      food: 0,
      farmer: 2,
      fence: 0,
      barn: 0,
      homeFarmer: 2,
      baby: 0,
      bagging: 0,
      slots: initBoard,
      roomType: 'wood',
    },
    {
      number: 4,
      name: '플레이어 4',
      color: 'purple',
      isFirst: false,
      wood: 0,
      clay: 0,
      stone: 0,
      reed: 0,
      grain: 0,
      vegetable: 0,
      sheep: 0,
      pig: 0,
      cattle: 0,
      food: 0,
      farmer: 2,
      fence: 0,
      barn: 0,
      homeFarmer: 2,
      baby: 0,
      bagging: 0,
      slots: initBoard,
      roomType: 'wood',
    },
  ],
});

export type PlayerAction =
  | '액션선택'
  | '방 확장'
  | '씨 뿌리기'
  | '밭 일구기'
  | '울타리 설치'
  | '외양간 설치'
  | '농장 확장';

export const currentActionState = atom<PlayerAction | null>({
  key: 'currentActionState',
  default: null,
});
