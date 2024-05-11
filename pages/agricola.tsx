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
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

const harvest_rounds = [5, 8, 10, 12, 14, 15];

const AgricolaPage = () => {
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

export default AgricolaPage;
