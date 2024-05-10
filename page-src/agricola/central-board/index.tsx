import styled from '@emotion/styled';
import { 갈대밭 } from 'page-src/agricola/central-board/central-board.sub/action-board/갈대밭';
import { 곡식종자 } from 'page-src/agricola/central-board/central-board.sub/action-board/곡식종자';
import { 곡식활용 } from 'page-src/agricola/central-board/central-board.sub/action-board/곡식활용';
import { 교습 } from 'page-src/agricola/central-board/central-board.sub/action-board/교습';
import { 급한가족늘리기 } from 'page-src/agricola/central-board/central-board.sub/action-board/급한가족늘리기';
import { 기본가족늘리기 } from 'page-src/agricola/central-board/central-board.sub/action-board/기본가족늘리기';
import { 낚시 } from 'page-src/agricola/central-board/central-board.sub/action-board/낚시';
import { 날품팔이 } from 'page-src/agricola/central-board/central-board.sub/action-board/날품팔이';
import { 농장개조 } from 'page-src/agricola/central-board/central-board.sub/action-board/농장개조';
import { 농장확장 } from 'page-src/agricola/central-board/central-board.sub/action-board/농장확장';
import { 농지 } from 'page-src/agricola/central-board/central-board.sub/action-board/농지';
import { 동부채석장 } from 'page-src/agricola/central-board/central-board.sub/action-board/동부채석장';
import { 돼지시장 } from 'page-src/agricola/central-board/central-board.sub/action-board/돼지시장';
import { 밭농사 } from 'page-src/agricola/central-board/central-board.sub/action-board/밭농사';
import { 서부채석장 } from 'page-src/agricola/central-board/central-board.sub/action-board/서부채석장';
import { 설비 } from 'page-src/agricola/central-board/central-board.sub/action-board/설비';
import { 소시장 } from 'page-src/agricola/central-board/central-board.sub/action-board/소시장';
import { 숲 } from 'page-src/agricola/central-board/central-board.sub/action-board/숲';
import { 양시장 } from 'page-src/agricola/central-board/central-board.sub/action-board/양시장';
import { 울타리 } from 'page-src/agricola/central-board/central-board.sub/action-board/울타리';
import { 집개조 } from 'page-src/agricola/central-board/central-board.sub/action-board/집개조';
import { 채소종자 } from 'page-src/agricola/central-board/central-board.sub/action-board/채소종자';
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
      <숲 />
      <흙채굴장 />
      <갈대밭 />
      <낚시 />
      {/* 라운드 순서대로 표시 */}
      {/* 1주기 */}
      <곡식활용 />
      <설비 />
      <양시장 />
      <울타리 />
      {/* 2주기 */}
      <서부채석장 />
      <기본가족늘리기 />
      <집개조 />
      {/* 3주기 */}
      <돼지시장 />
      <채소종자 />
      {/* 4주기 */}
      <동부채석장 />
      <소시장 />
      {/* 5주기 */}
      <밭농사 />
      <급한가족늘리기 />
      {/* 6주기 */}
      <농장개조 />
    </CentralBoardContainer>
  );
};

const CentralBoardContainer = styled.div`
  background-image: url('https://x.boardgamearena.net/data/themereleases/current/games/agricola/220107-0030/img/central.png');
  background-size: 100% auto;
  background-repeat: no-repeat;
  height: 795px;
  min-width: 830px;
  position: relative;
`;
