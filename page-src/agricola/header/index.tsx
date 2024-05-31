import {
  currentPlayerIndexState,
  playersState,
  remainMainCardsState,
  roundState,
} from '@/shared/recoil';
import styled from '@emotion/styled';
import { useRecoilState, useRecoilValue } from 'recoil';

export const Header = () => {
  const [round, setRound] = useRecoilState(roundState);
  const [players, setPlayers] = useRecoilState(playersState);
  const currentPlayerIndex = useRecoilValue(currentPlayerIndexState);
  const [remainMainCards, setRemainMainCards] = useRecoilState(remainMainCardsState);
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
              ownedFence: [
                {
                  id: 1,
                  animalType: '양',
                },
              ],
              slots: players[2].slots.map((slot, index) => {
                if (index === 0) {
                  return { ...slot, type: '방' };
                }

                if (index === 4) {
                  return { ...slot, type: '밭' };
                }

                //12.13.14

                if (index === 12) {
                  return {
                    ...slot,
                    type: '울타리',
                    fenceId: 1,
                    emptyFenceDirections: [3],
                    resource: '양',
                    count: 2,
                  };
                }

                if (index === 13) {
                  return {
                    ...slot,
                    type: '울타리',
                    fenceId: 1,
                    emptyFenceDirections: [2, 3],
                    resource: '양',
                    count: 2,
                  };
                }

                if (index === 14) {
                  return {
                    ...slot,
                    type: '울타리',
                    fenceId: 1,
                    emptyFenceDirections: [2],
                    resource: '양',
                    count: 2,
                  };
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
          setTimeout(() => {
            setRound(14);
          }, 0);

          setRemainMainCards(
            remainMainCards.filter(value => value.name === '그릇제작소' || value.name === '화로')
          );

          setPlayers([
            {
              ...players[0],
              isFirst: false,
              wood: 1,
              stone: 5,
              clay: 2,
              reed: 1,
              food: 2,
              grain: 5,
              roomType: 'clay',
              slots: players[0].slots.map((slot, index) => {
                if (index === 0) {
                  return { ...slot, type: '방' };
                }

                if (index === 2 || index === 3 || index === 4) {
                  return { ...slot, type: '밭' };
                }

                // 9.13.14

                if (index === 9) {
                  return {
                    ...slot,
                    type: '울타리',
                    fenceId: 1,
                    emptyFenceDirections: [1],
                  };
                }

                if (index === 13) {
                  return {
                    ...slot,
                    type: '울타리',
                    fenceId: 1,
                    emptyFenceDirections: [3],
                  };
                }

                if (index === 14) {
                  return {
                    ...slot,
                    type: '울타리',
                    fenceId: 1,
                    emptyFenceDirections: [0, 2],
                  };
                }

                return slot;
              }),
              jobCards: players[0].jobCards.map(card => {
                if (card.name === '작살꾼' || card.name === '재산관리인') {
                  return {
                    ...card,
                    isActive: true,
                  };
                }

                return card;
              }),
              mainCards: [
                ...players[0].mainCards,
                {
                  name: '그릇제작소',
                  isActive: true,
                  src: '/main-card/그릇제작소.jpg',
                  score: 1,
                },
              ],
            },
            {
              ...players[1],
              wood: 4,
              stone: 2,
              reed: 2,
              clay: 3,
              food: 0,
              grain: 7,
              vegetable: 1,
              farmer: 3,
              roomType: 'clay',
              slots: players[1].slots.map((slot, index) => {
                if (index === 0) {
                  return {
                    ...slot,
                    type: '방',
                  };
                }

                if (index === 3) {
                  return { ...slot, type: '밭', resource: '채소', count: 1 };
                }
                if (index === 4) {
                  return { ...slot, type: '밭', resource: '곡식', count: 1 };
                }

                if (index === 8) {
                  return { ...slot, type: '밭', resource: '곡식', count: 1 };
                }
                if (index === 9) {
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
              subCards: players[1].subCards.map(card => {
                if (card.name === '곡식용삽') {
                  return {
                    ...card,
                    isActive: true,
                  };
                }
                return card;
              }),
            },
            {
              // 가족 3, 나무 8, 돌 0, 흙1, 갈대 0,  음식 0, 곡식 2, 채소 1, 밭 3(null, 채소1, null), 흙방 3, 보조설비(채굴망치), 주요설비(화로), 직업(버섯따는사람), 양 6, 돼지 5, 소 3, 울타리 15, 외양간 3
              ...players[2],
              reed: 1,
              wood: 8,
              stone: 0,
              clay: 1,
              food: 0,
              farmer: 3,
              grain: 2,
              vegetable: 1,
              ownedFence: [
                {
                  id: 1,
                  animalType: '양',
                },
                {
                  id: 2,
                  animalType: '돼지',
                },
                {
                  id: 3,
                  animalType: '소',
                },
              ],
              slots: players[2].slots.map((slot, index) => {
                if (index === 0) {
                  return { ...slot, type: '방' };
                }

                if (index === 2) {
                  return { ...slot, type: '밭' };
                }

                if (index === 3) {
                  return { ...slot, type: '밭', resource: '채소', count: 1 };
                }

                if (index === 4) {
                  return { ...slot, type: '밭' };
                }

                if (index === 6) {
                  return {
                    ...slot,
                    type: '울타리',
                    fenceId: 2,
                    emptyFenceDirections: [1],
                    resource: '돼지',
                    count: 3,
                    barn: 1,
                  };
                }

                if (index === 11) {
                  return {
                    ...slot,
                    type: '울타리',
                    fenceId: 2,
                    emptyFenceDirections: [0],
                    resource: '돼지',
                    count: 2,
                  };
                }

                if (index === 7) {
                  return {
                    ...slot,
                    type: '울타리',
                    fenceId: 3,
                    emptyFenceDirections: [3],
                    resource: '소',
                    count: 2,
                  };
                }

                if (index === 8) {
                  return {
                    ...slot,
                    type: '울타리',
                    fenceId: 3,
                    emptyFenceDirections: [2],
                    resource: '소',
                    count: 2,
                  };
                }

                //12.13.14

                if (index === 12) {
                  return {
                    ...slot,
                    type: '울타리',
                    fenceId: 1,
                    emptyFenceDirections: [3],
                    resource: '양',
                    count: 2,
                  };
                }

                if (index === 13) {
                  return {
                    ...slot,
                    type: '울타리',
                    fenceId: 1,
                    emptyFenceDirections: [2, 3],
                    resource: '양',
                    count: 2,
                  };
                }

                if (index === 14) {
                  return {
                    ...slot,
                    type: '울타리',
                    fenceId: 1,
                    emptyFenceDirections: [2],
                    resource: '양',
                    count: 2,
                  };
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
              mainCards: [
                ...players[2].mainCards,
                { name: '화로', isActive: true, src: '/main-card/화로.jpg', score: 1 },
              ],
            },
            {
              ...players[3],
              isFirst: true,
              wood: 6,
              stone: 0,
              clay: 2,
              food: 2,
              reed: 2,
              grain: 3,
              vegetable: 1,
              ownedFence: [
                {
                  id: 1,
                  animalType: '양',
                },
              ],
              slots: players[3].slots.map((slot, index) => {
                if (index === 0) {
                  return { ...slot, type: '방' };
                }

                if (index === 1 || index === 6 || index === 7 || index === 8 || index === 11) {
                  return { ...slot, type: '밭' };
                }

                if (index === 2) {
                  return { ...slot, type: '밭', resource: '곡식', count: 2 };
                }

                if (index === 3) {
                  return { ...slot, type: '밭', resource: '곡식', count: 2 };
                }

                if (index === 3) {
                  return { ...slot, type: '밭', resource: '채소', count: 1 };
                }

                if (index === 12) {
                  return {
                    ...slot,
                    type: '울타리',
                    fenceId: 1,
                    count: 2,
                    resource: '양',
                    emptyFenceDirections: [3],
                  };
                }

                if (index === 13) {
                  return {
                    ...slot,
                    type: '울타리',
                    fenceId: 1,
                    count: 2,
                    resource: '양',
                    emptyFenceDirections: [2, 3],
                  };
                }

                if (index === 14) {
                  return {
                    ...slot,
                    type: '울타리',
                    fenceId: 1,
                    count: 2,
                    resource: '양',
                    emptyFenceDirections: [2],
                  };
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
