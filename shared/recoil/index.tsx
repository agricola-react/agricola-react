import { RoomType } from 'page-src/agricola/player-board/player-board.sub/room';
import { ResourceType, SlotType } from 'page-src/agricola/player-board/player-board.sub/slot';
import { COL, ROW } from 'page-src/agricola/shared/utils/get-two-dimension-board';
import { atom } from 'recoil';

export const resultModalOpenState = atom({
  key: 'resultModalOpenState',
  default: false,
});

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

export type JobType = {
  name: string;
  isActive: boolean;
  src: string;
};

const initBoard: SlotValue[] = new Array(ROW * COL)
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
  // 직업 카드
  jobCards: JobType[];
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
      jobCards: [
        {
          name: '마술사',
          isActive: false,
          src: '/job-card/마술사.jpg',
        },
        {
          name: '창고관리인',
          isActive: false,
          src: '/job-card/창고관리인.jpg',
        },
        {
          name: '채소장수',
          isActive: false,
          src: '/job-card/채소장수.jpg',
        },
      ],
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
      jobCards: [
        {
          name: '나무꾼',
          isActive: false,
          src: '/job-card/나무꾼.jpg',
        },
        {
          name: '보조경작자',
          isActive: false,
          src: '/job-card/보조경작자.jpg',
        },
        {
          name: '쟁기몰이꾼',
          isActive: false,
          src: '/job-card/쟁기몰이꾼.jpg',
        },
      ],
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
      jobCards: [
        {
          name: '버섯따는사람',
          isActive: false,
          src: '/job-card/버섯따는사람.jpg',
        },
        {
          name: '지붕다지는사람',
          isActive: false,
          src: '/job-card/지붕다지는사람.jpg',
        },
        {
          name: '지붕다지는사람',
          isActive: false,
          src: '/job-card/지붕다지는사람.jpg',
        },
      ],
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
      jobCards: [
        {
          name: '소규모농부',
          isActive: false,
          src: '/job-card/소규모농부.jpg',
        },
        {
          name: '작살꾼',
          isActive: false,
          src: '/job-card/작살꾼.jpg',
        },
        {
          name: '재산관리인',
          isActive: false,
          src: '/job-card/재산관리인.jpg',
        },
      ],
    },
  ],
});

export type PlayerAction = '농장 확장' | '농지';

export const currentActionState = atom<PlayerAction | null>({
  key: 'currentActionState',
  default: null,
});
