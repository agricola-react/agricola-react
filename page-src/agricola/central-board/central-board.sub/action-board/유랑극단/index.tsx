import { currentActionState, roundState } from '@/shared/recoil';
import { MeepleFood } from '@/shared/resource/meeple-food';
import styled from '@emotion/styled';
import { ActionContainer } from 'page-src/agricola/central-board/central-board.sub/action-board/shared/components/action-container';
import { useCurrentPlayer } from 'page-src/agricola/shared/hooks/use-current-player';
import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { produce } from 'immer';

export const TravelingTheater = () => {
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

    if (selectedPlayerNumber !== undefined) return;

    // 있으면 나무 1개와 곡식1개 추가로 가져옴
    const 마술사가있는지 = currentPlayer.jobCards.find(
      job => job.name === '마술사' && job.isActive
    );

    if (마술사가있는지) {
      alert('마술사카드가 활성화되어 나무 1개와 곡식 1개를 추가로 얻습니다.');
    }

    // 현재턴인 플레이어의 갈대 음식을 1 증가시킨다.(누적됨)
    if (currentPlayer.homeFarmer > 0) {
      setPlayers(
        produce(_players => {
          _players[currentPlayerIndex].food += currentFood;
          _players[currentPlayerIndex].homeFarmer -= 1;
          _players[currentPlayerIndex].wood = 마술사가있는지
            ? _players[currentPlayerIndex].wood + 1
            : _players[currentPlayerIndex].wood;
          _players[currentPlayerIndex].grain = 마술사가있는지
            ? _players[currentPlayerIndex].grain + 1
            : _players[currentPlayerIndex].grain;
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

    // 시뮬레이션을 위한 코드
    if (round === 4) {
      setCurrentFood(1);
    }

    if (round === 14) {
      setCurrentFood(3);
    }
  }, [round]);

  return (
    <ActionContainer
      width={140}
      height={86}
      top={620}
      left={15}
      isActive
      title="유랑극단"
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
