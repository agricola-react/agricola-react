import styled from '@emotion/styled';
import { CentralBoard } from 'page-src/agricola/central-board';
import { Header } from 'page-src/agricola/header';

const AgricolaPage = () => {
  return (
    <StyledBackground>
      <Header />
      <CentralBoard />
    </StyledBackground>
  );
};

const StyledBackground = styled.div`
  background-image: url('https://x.boardgamearena.net/data/themereleases/current/games/agricola/220107-0030/img/background.jpg');
  height: 100%;
  width: 100%;
  padding-top: 10px;
`;

export default AgricolaPage;
