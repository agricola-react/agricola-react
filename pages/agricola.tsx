import {
  currentActionState,
  currentPlayerIndexState,
  playersState,
  roundState,
} from '@/shared/recoil';
import styled from '@emotion/styled';
import { CentralBoard } from 'page-src/agricola/central-board';
import { Header } from 'page-src/agricola/header';
import { PlayerSlots } from 'page-src/agricola/player-board';
import { calculateFeedingCount } from 'page-src/agricola/shared/utils/calculate-feeding-count';
import { UserSection } from 'page-src/agricola/user-section';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

const harvest_rounds = [5, 8, 10, 12, 14, 15];

const AgricolaPage = () => {
  const [isBottom, setIsBottom] = useState(false);

  const [players, setPlayers] = useRecoilState(playersState);
  const [round, setRound] = useRecoilState(roundState);
  const currentPlayerIndex = useRecoilValue(currentPlayerIndexState);
  const action = useRecoilValue(currentActionState);

  const homeFarmers = players.reduce((acc, cur) => {
    return acc + cur.homeFarmer;
  }, 0);

  useEffect(() => {
    // 라운드가 끝났으면 다음 라운드로 넘어가기

    if (homeFarmers === 0 && action === null) {
      setRound(round => round + 1);
    }
  }, [homeFarmers, action]);

  useEffect(() => {
    /**
     * 수확로직 (harvest_rounds로 넘어가기전 실행)
     * 1. 작물수확(TODO)
     * 2. 가족먹여살리기
     * 3. 번식(TODO)
     */
    const isHarvestTime = harvest_rounds.includes(round);

    if (isHarvestTime) {
      alert('가족먹여살리기 시간입니다.');
    }

    setPlayers(
      players.map(player => {
        const { newFood, newGrain, newVegetable, remainingFood } = calculateFeedingCount(player);

        return {
          ...player,
          farmer: player.farmer + player.baby,
          homeFarmer: player.farmer + player.baby,
          baby: 0,
          food: isHarvestTime ? newFood : player.food,
          grain: isHarvestTime ? newGrain : player.grain,
          vegetable: isHarvestTime ? newVegetable : player.vegetable,
          bagging: isHarvestTime
            ? remainingFood > 0
              ? remainingFood
              : player.bagging
            : player.bagging,
        };
      })
    );
  }, [round]);

  return (
    <StyledBackground>
      <Header />
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
      <BoardWrapper>
        <CentralBoard />
        <UserSection />
      </BoardWrapper>
      <PlayerBoardWrapper>
        {players.map(player => (
          <PlayerSlots key={player.number} playerNumber={player.number} />
        ))}
      </PlayerBoardWrapper>
      <FloatingButton
        onClick={() => {
          const height = isBottom ? 0 : document.body.scrollHeight;
          window.scrollTo({
            top: height,
            behavior: 'smooth',
          });
          setIsBottom(prev => !prev);
        }}
      >
        {isBottom ? '위로' : '아래로'}
      </FloatingButton>
    </StyledBackground>
  );
};

const StyledBackground = styled.div`
  background-image: url('https://x.boardgamearena.net/data/themereleases/current/games/agricola/220107-0030/img/background.jpg');
  background-repeat: repeat;
  overflow: scroll;
  height: 100%;
  width: 100%;
  padding-top: 10px;
`;

const BoardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 30px;
  padding-top: 10px;
`;

const PlayerBoardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const FloatingButton = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: white;
  border: 1px solid black;
  border-radius: 50%;
  width: 70px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  font-size: 20px;
  font-weight: bold;
`;

export default AgricolaPage;
