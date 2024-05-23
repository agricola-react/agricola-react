import { currentActionState, roundState } from '@/shared/recoil';
import { MeepleFood } from '@/shared/resource/meeple-food';
import styled from '@emotion/styled';
import { ActionContainer } from 'page-src/agricola/central-board/central-board.sub/action-board/shared/components/action-container';
import { useCurrentPlayer } from 'page-src/agricola/shared/hooks/use-current-player';
import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { produce } from 'immer';

export const 낚시 = () => {
  const { currentPlayer, setPlayers, currentPlayerIndex, nextPlayer } = useCurrentPlayer();
  const [selectedPlayerNumber, setSelectedPlayerNumber] = useState<undefined | number>(undefined);
  const [currentFood, setCurrentFood] = useState(0);
  const round = useRecoilValue(roundState);
  const action = useRecoilValue(currentActionState);

  const handleClick = () => {
    if (action !== null) {
      alert(`[${currentPlayer.name}] 님의 액션을 완료해주세요.`);
      return;
    }

    if (selectedPlayerNumber !== undefined) {
      alert('이미 선택한 플레이어입니다!!');
      return;
    }

    if (currentPlayer.homeFarmer === 0) {
      alert('홈파머가 부족합니다.');
      return;
    }

    const 통나무배가있는지 = currentPlayer.subCards.find(
      card => card.name === '통나무배' && card.isActive
    );

    if (통나무배가있는지) {
      alert('통나무배가 있어서 음식 + 1, 갈대 + 1 됩니다.');
    }

    const 작살꾼소유여부 = currentPlayer.jobCards.find(
      card => card.name === '작살꾼' && card.isActive
    );

    if (작살꾼소유여부) {
      alert(
        '작살꾼카드가 발동하여 나무 1개를 내고 가족 수만큼의 음식과 갈대 1개를 가져올 수 있습니다.'
      );
    }

    if (selectedPlayerNumber === undefined && currentPlayer.homeFarmer > 0) {
      setPlayers(
        produce(_players => {
          _players[currentPlayerIndex].food += 통나무배가있는지 ? currentFood + 1 : currentFood;
          _players[currentPlayerIndex].reed += 통나무배가있는지
            ? _players[currentPlayerIndex].reed + 1
            : _players[currentPlayerIndex].reed;
          _players[currentPlayerIndex].wood -= 작살꾼소유여부 ? 1 : 0;
          _players[currentPlayerIndex].food += 작살꾼소유여부 ? currentPlayer.farmer : 0;
          _players[currentPlayerIndex].reed += 작살꾼소유여부 ? 1 : 0;
          _players[currentPlayerIndex].homeFarmer -= 1;
        })
      );
      setCurrentFood(0);
      setSelectedPlayerNumber(currentPlayer.number);
      nextPlayer();
    }
  };

  // 누적
  useEffect(() => {
    setCurrentFood(prev => prev + 1);
    setSelectedPlayerNumber(undefined);
  }, [round]);

  return (
    <ActionContainer
      width={140}
      height={86}
      top={514}
      left={167}
      isActive
      title="낚시"
      onClick={handleClick}
      userNumber={selectedPlayerNumber}
    >
      <ContentWrapper>
        <Wrapper>
          <Text>1</Text>
          <MeepleFood width={15} height={15} />
        </Wrapper>
        <Wrapper>
          <div>누적 {currentFood}개</div>
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
