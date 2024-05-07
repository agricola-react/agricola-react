import { atom } from 'recoil';

type PlayerAction =
  | '액션선택'
  | '방 확장'
  | '씨 뿌리기'
  | '밭 일구기'
  | '울타리 설치'
  | '외양간 설치';

type 현재_턴_정보 = {
  playerNumber: number;
  action: PlayerAction | null;
};

export const 현재턴State = atom<현재_턴_정보>({
  key: 'turnInfo',
  default: {
    playerNumber: 0,
    action: null,
  },
});
