import { currentPlayerIndexState, playersState, roundState } from '@/shared/recoil';
import styled from '@emotion/styled';
import { CentralBoard } from 'page-src/agricola/central-board';
import { Header } from 'page-src/agricola/header';
import { UserSection } from 'page-src/agricola/user-section';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { PlayerBoard } from 'page-src/agricola/player-board';
import PointNow from 'page-src/agricola/central-board/central-board.sub/action-board/점수현황판';

const AgricolaPage = () => {
  const [players, setPlayers] = useRecoilState(playersState);
  const setRound = useSetRecoilState(roundState);
  const currentPlayerIndex = useRecoilValue(currentPlayerIndexState);

  useEffect(() => {
    const homeFarmers = players.reduce((acc, cur) => {
      return acc + cur.homeFarmer;
    }, 0);

    if (homeFarmers === 0) {
      setRound(round => round + 1);
      setPlayers(players.map(player => ({ ...player, homeFarmer: player.farmer })));
    }
  }, [players]);

  return (
    <StyledBackground>
      <Header />
      <p style={{ textAlign: 'center' }}>현재 턴: {players[currentPlayerIndex].name}</p>
      {/* <PointNow /> */}
      <BoardWrapper>
        <CentralBoard />
        <UserSection />
      </BoardWrapper>
      <PlayerBoardWrapper>
        {players.map(player => (
          <PlayerBoard key={player.number} playerNumber={player.number} />
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
