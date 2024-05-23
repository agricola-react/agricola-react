import { RoomType } from 'page-src/agricola/player-board/player-board.sub/room';
import { ResourceType, SlotType } from 'page-src/agricola/player-board/player-board.sub/slot';
import { atom } from 'recoil';
import { COL, ROW } from '../constants';

export const resultModalOpenState = atom({
  key: 'resultModalOpenState',
  default: false,
});

export const roundState = atom({
  key: 'roundState',
  default: 11,
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

export type CardType = {
  name: string;
  isActive: boolean;
  src: string;
};

export const initBoard: SlotValue[] = new Array(ROW * COL)
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

export const INIT_PLAYER: Player = {
  number: 0,
  name: '',
  color: '',
  isFirst: false,
  wood: 10,
  clay: 10,
  stone: 10,
  reed: 10,
  grain: 10,
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
  jobCards: [],
  subCards: [],
  mainCards: [],
} as const;

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
  jobCards: CardType[];
  // 보조카드
  subCards: CardType[];
  // 주요카드
  mainCards: CardType[];
};

export const playersState = atom<Player[]>({
  key: 'playersState',
  default: [
    {
      ...INIT_PLAYER,
      number: 1,
      name: '플레이어 1',
      color: 'red',
      isFirst: true,
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
      subCards: [
        {
          name: '부엌방',
          isActive: false,
          src: '/sub-card/부엌방.jpg',
        },
        {
          name: '다진흙',
          isActive: false,
          src: '/sub-card/다진흙.jpg',
        },
        {
          name: '물통',
          isActive: false,
          src: '/sub-card/물통.jpg',
        },
      ],
    },
    {
      ...INIT_PLAYER,
      number: 2,
      name: '플레이어 2',
      color: 'green',
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
      subCards: [
        {
          name: '통나무배',
          isActive: false,
          src: '/sub-card/통나무배.jpg',
        },
        {
          name: '네덜란드식풍차',
          isActive: false,
          src: '/sub-card/네덜란드식풍차.jpg',
        },
        {
          name: '병',
          isActive: false,
          src: '/sub-card/병.jpg',
        },
      ],
    },
    {
      ...INIT_PLAYER,
      number: 3,
      name: '플레이어 3',
      color: '#00D8FF',
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
          name: '가마때는사람',
          isActive: false,
          src: '/job-card/가마때는사람.jpg',
        },
      ],
      subCards: [
        {
          name: '채굴망치',
          isActive: false,
          src: '/sub-card/채굴망치.jpg',
        },
        {
          name: '돌집게',
          isActive: false,
          src: '/sub-card/돌집게.jpg',
        },
        {
          name: '목재소',
          isActive: false,
          src: '/sub-card/목재소.jpg',
        },
      ],
    },
    {
      ...INIT_PLAYER,
      number: 4,
      name: '플레이어 4',
      color: 'purple',
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
      subCards: [
        {
          name: '곡식용삽',
          isActive: false,
          src: '/sub-card/곡식용삽.jpg',
        },
        {
          name: '버터제조기',
          isActive: false,
          src: '/sub-card/버터제조기.jpg',
        },
        {
          name: '삽',
          isActive: false,
          src: '/sub-card/삽.jpg',
        },
      ],
    },
  ],
});

export type PlayerAction = '농장 확장' | '농지' | '씨뿌리기' | '빵굽기';

export type PlayerActionType = {
  type: PlayerAction;
  isDone: boolean;
};

export const currentActionState = atom<PlayerActionType | null>({
  key: 'currentActionState',
  default: null,
});

export const currentRoundNameState = atom<string>({
  key: 'currentRoundNameState',
  default: '',
});

export const remainMainCardsState = atom<CardType[]>({
  key: 'remainMainCardsState',
  default: [
    {
      name: '가구제작소',
      src: '/main-card/가구제작소.jpg',
      isActive: true,
    },
    {
      name: '그릇제작소',
      src: '/main-card/그릇제작소.jpg',
      isActive: true,
    },
    {
      name: '돌가마',
      src: '/main-card/돌가마.jpg',
      isActive: true,
    },
    {
      name: '바구니제작소',
      src: '/main-card/바구니제작소.jpg',
      isActive: true,
    },
    {
      name: '우물',
      src: '/main-card/우물.jpg',
      isActive: true,
    },
    {
      name: '화덕',
      src: '/main-card/화덕.jpg',
      isActive: true,
    },
    {
      name: '화덕5',
      src: '/main-card/화덕5.jpg',
      isActive: true,
    },
    {
      name: '화로',
      src: '/main-card/화로.jpg',
      isActive: true,
    },
    {
      name: '화로2',
      src: '/main-card/화로2.jpg',
      isActive: true,
    },
    {
      name: '흙가마',
      src: '/main-card/흙가마.jpg',
      isActive: true,
    },
  ],
});
