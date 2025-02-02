import { currentActionState, roundState } from '@/shared/recoil';
import { Wood } from '@/shared/resource/wood';
import styled from '@emotion/styled';
import { produce } from 'immer';
import { ActionContainer } from 'page-src/agricola/central-board/central-board.sub/action-board/shared/components/action-container';
import { useCurrentPlayer } from 'page-src/agricola/shared/hooks/use-current-player';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

export const Thicket = () => {
  const { currentPlayer, setPlayers, currentPlayerIndex, nextPlayer } = useCurrentPlayer();
  const [selectedPlayerNumber, setSelectedPlayerNumber] = useState<undefined | number>(undefined);
  const [currentWood, setCurrentWood] = useState(0);
  const round = useRecoilValue(roundState);
  const action = useRecoilValue(currentActionState);

  const handleClick = () => {
    if (action !== null) {
      alert(`[${currentPlayer.name}] 님의 액션을 완료해주세요.`);
      return;
    }

    if (selectedPlayerNumber !== undefined) return;

    const 나무꾼소유여부 = currentPlayer.jobCards.find(
      card => card.name === '나무꾼' && card.isActive
    );

    if (나무꾼소유여부) {
      alert('나무꾼카드가 발동하여 나무 +1 됩니다.');
    }
    // 현재턴인 플레이어의 나무 자원을 3 증가시킨다.(누적됨)
    if (currentPlayer.homeFarmer > 0) {
      setPlayers(
        produce(_players => {
          _players[currentPlayerIndex].wood += 나무꾼소유여부 ? 1 + currentWood : currentWood;

          _players[currentPlayerIndex].homeFarmer -= 1;
        })
      );
      setCurrentWood(0);
      setSelectedPlayerNumber(currentPlayer.number);
      nextPlayer();
    }
  };

  useEffect(() => {
    setCurrentWood(prev => prev + 2);
    setSelectedPlayerNumber(undefined);
  }, [round]);

  return (
    <ActionContainer
      top={220}
      left={15}
      width={140}
      height={86}
      isActive
      title="수풀"
      onClick={handleClick}
      userNumber={selectedPlayerNumber}
    >
      <ContentWrapper>
        <Wrapper>
          <Text>2</Text>
          <Wood width={15} height={17} />
        </Wrapper>
        <Wrapper>
          <div>누적 {currentWood}개</div>
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
