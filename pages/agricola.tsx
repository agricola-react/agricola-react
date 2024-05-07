import styled from '@emotion/styled';
import { CentralBoard } from 'page-src/agricola/central-board';
import { Header } from 'page-src/agricola/header';
import { UserSection } from 'page-src/agricola/user-section';
import { PlayerBoard } from 'page-src/agricola/player-board';

const AgricolaPage = () => {
  return (
    <StyledBackground>
      <Header />
      <BoardWrapper>
        <CentralBoard />
        <UserSection />
      </BoardWrapper>
      <PlayerBoardWrapper>
        <PlayerBoard playerNumber={1} />
        <PlayerBoard playerNumber={2} />
        <PlayerBoard playerNumber={3} />
        <PlayerBoard playerNumber={4} />
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
