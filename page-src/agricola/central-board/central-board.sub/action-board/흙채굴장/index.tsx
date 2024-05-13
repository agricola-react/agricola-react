import { roundState } from '@/shared/recoil';
import { Clay } from '@/shared/resource/clay';
import styled from '@emotion/styled';
import { produce } from 'immer';
import { ActionContainer } from 'page-src/agricola/central-board/central-board.sub/action-board/shared/components/action-container';
import { useCurrentPlayer } from 'page-src/agricola/shared/hooks/use-current-player';
import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';

export const 흙채굴장 = () => {
  const { currentPlayer, setPlayers, currentPlayerIndex, nextPlayer } = useCurrentPlayer();
  const [selectedPlayerNumber, setSelectedPlayerNumber] = useState<undefined | number>(undefined);
  const [currentClay, setCurrentClay] = useState(0);
  const round = useRecoilValue(roundState);

  const handleClick = () => {
    // 현재턴인 플레이어의 흙 자원을 3 증가시킨다.(누적됨)
    if (selectedPlayerNumber === undefined && currentPlayer.homeFarmer > 0) {
      setPlayers(
        produce(_players => {
          _players[currentPlayerIndex].clay += currentClay;
          _players[currentPlayerIndex].homeFarmer -= 1;
        })
      );
      setCurrentClay(0);
      setSelectedPlayerNumber(currentPlayer.number);
      nextPlayer();
    }
  };

  // 누적
  useEffect(() => {
    setCurrentClay(prev => prev + 1);
    setSelectedPlayerNumber(undefined);
  }, [round]);

  return (
    <ActionContainer
      width={140}
      height={86}
      top={306}
      left={167}
      isActive
      title="흙채굴장"
      onClick={handleClick}
      userNumber={selectedPlayerNumber}
    >
      <ContentWrapper>
        <Wrapper>
          <Text>1</Text>
          <Clay width={15} height={17} />
        </Wrapper>
        <Wrapper>
          <div>누적 {currentClay}개</div>
        </Wrapper>
      </ContentWrapper>
    </ActionContainer>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Text = styled.div`
  font-weight: bold;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100px;
`;
