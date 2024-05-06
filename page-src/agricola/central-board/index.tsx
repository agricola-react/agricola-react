import styled from '@emotion/styled';
import { 갈대밭 } from 'page-src/agricola/central-board/central-board.sub/action-board/갈대밭';
import { 곡식종자 } from 'page-src/agricola/central-board/central-board.sub/action-board/곡식종자';
import { 교습 } from 'page-src/agricola/central-board/central-board.sub/action-board/교습';
import { 낚시 } from 'page-src/agricola/central-board/central-board.sub/action-board/낚시';
import { 날품팔이 } from 'page-src/agricola/central-board/central-board.sub/action-board/날품팔이';
import { 농장확장 } from 'page-src/agricola/central-board/central-board.sub/action-board/농장확장';
import { 농지 } from 'page-src/agricola/central-board/central-board.sub/action-board/농지';
import { 숲 } from 'page-src/agricola/central-board/central-board.sub/action-board/숲';
import { 울타리 } from 'page-src/agricola/central-board/central-board.sub/action-board/울타리';
import { 회합장소 } from 'page-src/agricola/central-board/central-board.sub/action-board/회합장소';
import { 흙채굴장 } from 'page-src/agricola/central-board/central-board.sub/action-board/흙채굴장';

export const CentralBoard = () => {
  return (
    <CentralBoardContainer>
      <농장확장 />
      <회합장소 />
      <곡식종자 />
      <농지 />
      <교습 />
      <날품팔이 />
      <울타리 />
      <숲 />
      <흙채굴장 />
      <갈대밭 />
      <낚시 />
    </CentralBoardContainer>
  );
};

const CentralBoardContainer = styled.div`
  background-image: url('https://x.boardgamearena.net/data/themereleases/current/games/agricola/220107-0030/img/central.png');
  background-size: 100% auto;
  background-repeat: no-repeat;
  height: 795px;
  width: 830px;
  position: relative;
`;
