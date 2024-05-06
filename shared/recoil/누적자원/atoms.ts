import { atom } from 'recoil';

const 누적자원 = {
  숲: '숲',
  흙채굴장: '흙채굴장',
  갈대밭: '갈대밭',
  낚시: '낚시',
} as const;

type 누적자원Key = (typeof 누적자원)[keyof typeof 누적자원];

interface 누적자원Info {
  count: number; // 누적 개수
  add: number; // 얼마씩 증가?
}

interface 누적자원Type {
  resources: Map<누적자원Key, 누적자원Info>;
}

export const 누적자원State = atom<누적자원Type>({
  key: 'accumResources',
  default: {
    resources: new Map([
      [
        '갈대밭',
        {
          count: 1,
          add: 1,
        },
      ],
      [
        '숲',
        {
          count: 1,
          add: 3,
        },
      ],
      [
        '흙채굴장',
        {
          count: 1,
          add: 1,
        },
      ],
      [
        '낚시',
        {
          count: 1,
          add: 1,
        },
      ],
    ]),
  },
});
