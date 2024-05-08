import { roundState } from '@/shared/recoil';
import { MeepleCattle } from '@/shared/resource/meeple-cattle';
import styled from '@emotion/styled';
import { ActionContainer } from 'page-src/agricola/central-board/central-board.sub/action-board/shared/components/action-container';
import { useCurrentPlayer } from 'page-src/agricola/shared/hooks/use-current-player';
import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { produce } from 'immer';

export const 소시장 = () => {
  const [isActive, setIsActive] = useState(false);
  const { currentPlayer, setPlayers, currentPlayerIndex, nextPlayer } = useCurrentPlayer();
  const [selectedPlayerNumber, setSelectedPlayerNumber] = useState<undefined | number>(undefined);
  const [currentCattle, setCurrentCattle] = useState(0);
  const round = useRecoilValue(roundState);

  const handleClick = () => {
    // 현재턴인 플레이어의 갈대 음식을 1 증가시킨다.(누적됨)
    if (isActive && selectedPlayerNumber === undefined && currentPlayer.homeFarmer > 0) {
      setPlayers(
        produce(_players => {
          _players[currentPlayerIndex].sheep += currentCattle;
          _players[currentPlayerIndex].homeFarmer -= 1;
        })
      );
      setCurrentCattle(0);
      setSelectedPlayerNumber(currentPlayer.number);
      nextPlayer();
    }
  };

  useEffect(() => {
    if (round >= 11) {
      setIsActive(true);
      setCurrentCattle(prev => prev + 1);
      setSelectedPlayerNumber(undefined);
    }
  }, [round]);

  return (
    <ActionContainer
      width={140}
      height={140}
      top={462}
      left={493}
      isActive={isActive}
      title="소시장"
      backNumber={4}
      onClick={handleClick}
      userNumber={selectedPlayerNumber}
    >
      <ContentWrapper>
        <Wrapper>
          <Text>1</Text>
          <MeepleCattle width={30} height={25} />
        </Wrapper>
        <Wrapper>
          <div>누적 {currentCattle}개</div>
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
`;
