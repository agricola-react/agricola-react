import { roundState } from '@/shared/recoil';
import { Vegetable } from '@/shared/resource/vegetable';
import styled from '@emotion/styled';
import { ActionContainer } from 'page-src/agricola/central-board/central-board.sub/action-board/shared/components/action-container';
import { useCurrentPlayer } from 'page-src/agricola/shared/hooks/use-current-player';
import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { produce } from 'immer';

export const 채소종자 = () => {
  const [isActive, setIsActive] = useState(false);
  const { currentPlayer, setPlayers, currentPlayerIndex, nextPlayer } = useCurrentPlayer();
  const [selectedPlayerNumber, setSelectedPlayerNumber] = useState<undefined | number>(undefined);
  const round = useRecoilValue(roundState);

  const handleClick = () => {
    // 현재턴인 플레이어의 갈대 음식을 1 증가시킨다.(누적됨)
    if (isActive && selectedPlayerNumber === undefined && currentPlayer.homeFarmer > 0) {
      setPlayers(
        produce(_players => {
          _players[currentPlayerIndex].vegetable += 1;
          _players[currentPlayerIndex].homeFarmer -= 1;
        })
      );

      setSelectedPlayerNumber(currentPlayer.number);
      nextPlayer();
    }
  };

  useEffect(() => {
    if (round >= 9) {
      setIsActive(true);
      setSelectedPlayerNumber(undefined);
    }
  }, [round]);

  return (
    <ActionContainer
      width={140}
      height={140}
      top={311}
      left={493}
      isActive={isActive}
      title="채소종자"
      backNumber={3}
      onClick={handleClick}
      userNumber={selectedPlayerNumber}
    >
      <ContentWrapper>
        <Wrapper>
          <Text>+1</Text>
          <Vegetable width={20} height={25} />
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
