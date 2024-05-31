import { currentPlayerIndexState, playersState, roundState } from '@/shared/recoil';
import styled from '@emotion/styled';
import { useRecoilState, useRecoilValue } from 'recoil';

export const Header = () => {
  const [round, setRound] = useRecoilState(roundState);
  const [players, setPlayers] = useRecoilState(playersState);
  const currentPlayerIndex = useRecoilValue(currentPlayerIndexState);
  return (
    <div>
      <HeaderContainer>
        <div>아그리콜라 데모 버전</div>
        <div>{round} 라운드</div>
      </HeaderContainer>
      <p style={{ textAlign: 'center' }}>
        <strong
          style={{
            color: `${players[currentPlayerIndex].color}`,
          }}
        >
          {players[currentPlayerIndex].name}
        </strong>{' '}
        님의 차례입니다.
      </p>
      <FloatingTopButton
        left={20}
        onClick={() => {
          // 게임 상태 정의
          setRound(4);
          setPlayers([
            {
              ...players[0],
              wood: 3,
              reed: 2,
              food: 4,
              slots: players[0].slots.map((slot, index) => {
                if (index === 4) {
                  return { ...slot, type: '밭', resource: '곡식', count: 3 };
                }
                return slot;
              }),
            },
            {
              ...players[1],
              wood: 1,
              food: 9,
              grain: 2,
              slots: players[1].slots.map((slot, index) => {
                if (index === 4) {
                  return { ...slot, type: '밭' };
                }
                return slot;
              }),
              jobCards: players[1].jobCards.map(card => {
                if (card.name === '마술사') {
                  return {
                    ...card,
                    isActive: true,
                  };
                }

                return card;
              }),
            },
            {
              ...players[2],
              wood: 8,
              food: 5,
              grain: 1,
              jobCards: players[2].jobCards.map(card => {
                if (card.name === '버섯따는사람') {
                  return {
                    ...card,
                    isActive: true,
                  };
                }

                return card;
              }),
            },
            {
              ...players[3],
              wood: 2,
              reed: 2,
              stone: 2,
              clay: 4,
              food: 5,
              slots: players[3].slots.map((slot, index) => {
                if (index === 4) {
                  return { ...slot, type: '밭' };
                }
                return slot;
              }),
              jobCards: players[3].jobCards.map(card => {
                if (card.name === '보조경작자') {
                  return {
                    ...card,
                    isActive: true,
                  };
                }

                return card;
              }),
            },
          ]);
        }}
      >
        1번
      </FloatingTopButton>
      <FloatingTopButton
        left={80}
        onClick={() => {
          // 게임 상태 정의
          setTimeout(() => {
            setRound(9);
          }, 0);
          setPlayers([
            {
              ...players[0],
              isFirst: false,
              clay: 8,
              wood: 7,
              reed: 2,
              food: 3,
              grain: 2,
              slots: players[0].slots.map((slot, index) => {
                if (index === 0) {
                  return { ...slot, type: '방' };
                }

                if (index === 3) {
                  return { ...slot, type: '밭', resource: '곡식', count: 2 };
                }
                if (index === 4) {
                  return { ...slot, type: '밭', resource: '곡식', count: 1 };
                }
                return slot;
              }),
              jobCards: players[0].jobCards.map(card => {
                if (card.name === '작살꾼') {
                  return {
                    ...card,
                    isActive: true,
                  };
                }

                return card;
              }),
            },
            {
              ...players[1],
              wood: 5,
              stone: 1,
              reed: 5,
              clay: 10,
              food: 7,
              grain: 8,
              slots: players[1].slots.map((slot, index) => {
                if (index === 3) {
                  return { ...slot, type: '밭', resource: '곡식', count: 2 };
                }
                if (index === 4) {
                  return { ...slot, type: '밭', resource: '곡식', count: 1 };
                }
                return slot;
              }),
              jobCards: players[1].jobCards.map(card => {
                if (card.name === '마술사') {
                  return {
                    ...card,
                    isActive: true,
                  };
                }

                return card;
              }),
            },
            {
              ...players[2],
              reed: 1,
              wood: 11,
              food: 4,
              farmer: 3,
              grain: 1,
              slots: players[2].slots.map((slot, index) => {
                if (index === 0) {
                  return { ...slot, type: '방' };
                }

                if (index === 4) {
                  return { ...slot, type: '밭' };
                }

                //12.13.14

                if (index === 12) {
                  return { ...slot, type: '울타리', fenceId: 1, emptyFenceDirections: [3] };
                }

                if (index === 13) {
                  return { ...slot, type: '울타리', fenceId: 1, emptyFenceDirections: [2, 3] };
                }

                if (index === 14) {
                  return { ...slot, type: '울타리', fenceId: 1, emptyFenceDirections: [2] };
                }

                return slot;
              }),
              jobCards: players[2].jobCards.map(card => {
                if (card.name === '버섯따는사람') {
                  return {
                    ...card,
                    isActive: true,
                  };
                }

                return card;
              }),
              subCards: players[2].subCards.map(card => {
                if (card.name === '채굴망치') {
                  return {
                    ...card,
                    isActive: true,
                  };
                }
                return card;
              }),
            },
            {
              ...players[3],
              isFirst: true,
              wood: 5,
              stone: 2,
              clay: 2,
              food: 1,
              grain: 0,
              slots: players[3].slots.map((slot, index) => {
                if (index === 0) {
                  return { ...slot, type: '방' };
                }

                if (index === 1) {
                  return { ...slot, type: '밭', resource: '곡식', count: 3 };
                }

                if (index === 2 || index === 3 || index === 4) {
                  return { ...slot, type: '밭' };
                }

                return slot;
              }),
              jobCards: players[3].jobCards.map(card => {
                if (card.name === '보조경작자') {
                  return {
                    ...card,
                    isActive: true,
                  };
                }
                return card;
              }),
              subCards: players[3].subCards.map(card => {
                if (card.name === '통나무배') {
                  return {
                    ...card,
                    isActive: true,
                  };
                }

                return card;
              }),
            },
          ]);
        }}
      >
        2번
      </FloatingTopButton>
      <FloatingTopButton
        left={140}
        onClick={() => {
          // 게임 상태 정의
        }}
      >
        3번
      </FloatingTopButton>
    </div>
  );
};

const FloatingTopButton = styled.div<{ left: number }>`
  position: absolute;
  top: 20px;
  left: ${props => props.left}px;
  background-color: white;
  border: 1px solid black;
  border-radius: 10px;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  font-size: 20px;
  font-weight: bold;
`;

const HeaderContainer = styled.div`
  background-color: #4c4c4c;
  color: white;
  padding: 15px 30px;
  border-radius: 20px;
  width: 300px;
  text-align: center;
  margin: 0px auto;
  font-weight: bold;
`;
