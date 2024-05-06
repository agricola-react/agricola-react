import { 누적자원State } from '@/shared/recoil/누적자원/atoms';
import styled from '@emotion/styled';
import { CentralBoard } from 'page-src/agricola/central-board';
import { Header } from 'page-src/agricola/header';
import { UserSection } from 'page-src/agricola/user-section';
import { useRecoilState } from 'recoil';

const AgricolaPage = () => {
  const [accumResources, setAccumRescources] = useRecoilState(누적자원State);
  const handleRound = () => {
    setAccumRescources(prev => {
      const nextValue = new Map(prev.resources);
      nextValue.forEach((value, key, map) =>
        map.set(key, { ...value, count: value.count + value.add })
      );
      return { resources: nextValue };
    });
    console.log(accumResources);
  };

  return (
    <StyledBackground>
      <Header />
      <TestButton onClick={handleRound}>라운드 끝난 후 자원 값 올리기</TestButton>
      <BoardWrapper>
        <CentralBoard />
        <UserSection />
      </BoardWrapper>
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

const TestButton = styled.button`
  background-color: white;
`;

export default AgricolaPage;
