import { currentActionState, roundState } from '@/shared/recoil';
import { Stone } from '@/shared/resource/stone';
import styled from '@emotion/styled';
import { ActionContainer } from 'page-src/agricola/central-board/central-board.sub/action-board/shared/components/action-container';
import { useCurrentPlayer } from 'page-src/agricola/shared/hooks/use-current-player';
import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { produce } from 'immer';

export const 동부채석장 = () => {
  const [isActive, setIsActive] = useState(false);
  const { currentPlayer, setPlayers, currentPlayerIndex, nextPlayer } = useCurrentPlayer();
  const [selectedPlayerNumber, setSelectedPlayerNumber] = useState<undefined | number>(undefined);
  const [currentStone, setCurrentStone] = useState(0);
  const round = useRecoilValue(roundState);
  const action = useRecoilValue(currentActionState);

  const handleClick = () => {
    if (action !== null) {
      alert(`[${currentPlayer.name}] 님의 액션을 완료해주세요.`);
      return;
    }

    if (!isActive) return;

    if (selectedPlayerNumber !== undefined) {
      alert('이미 선택한 플레이어입니다!!');
      return;
    }

    if (currentPlayer.homeFarmer === 0) {
      alert('홈파머가 부족합니다.');
      return;
    }

    const 돌집게가지고있는지 = currentPlayer.subCards.find(
      card => card.name === '돌집게' && card.isActive
    );

    if (돌집게가지고있는지) {
      alert('돌집게카드가 발동하여 돌을 +1 합니다.');
    }

    setPlayers(
      produce(_players => {
        _players[currentPlayerIndex].stone += 돌집게가지고있는지 ? currentStone + 1 : currentStone;
        _players[currentPlayerIndex].homeFarmer -= 1;
      })
    );
    setCurrentStone(0);
    setSelectedPlayerNumber(currentPlayer.number);
    nextPlayer();
  };

  useEffect(() => {
    if (round >= 10) {
      setIsActive(true);
      setCurrentStone(prev => prev + 1);
      setSelectedPlayerNumber(undefined);
    }
  }, [round]);

  return (
    <ActionContainer
      width={140}
      height={140}
      top={462}
      left={331}
      isActive={isActive}
      title="동부채석장"
      backNumber={4}
      onClick={handleClick}
      userNumber={selectedPlayerNumber}
    >
      <ContentWrapper>
        <Wrapper>
          <Text>1</Text>
          <Stone width={20} height={25} />
        </Wrapper>
        <Wrapper>
          <div>누적 {currentStone}개</div>
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
