import { roundState } from '@/shared/recoil';
import { MeepleFood } from '@/shared/resource/meeple-food';
import { MeepleOccupation } from '@/shared/resource/meeple-occupation';
import styled from '@emotion/styled';
import { produce } from 'immer';
import { ActionContainer } from 'page-src/agricola/central-board/central-board.sub/action-board/shared/components/action-container';
import { useCurrentPlayer } from 'page-src/agricola/shared/hooks/use-current-player';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

// TODO: 직업카드 작업해야함
export const 교습 = () => {
  const { currentPlayer, setPlayers, currentPlayerIndex, nextPlayer } = useCurrentPlayer();
  const [selectedPlayerNumber, setSelectedPlayerNumber] = useState<undefined | number>(undefined);
  const [usedPlayers, setUsedPlayers] = useState<number[]>([]); // 사용한 플레이어 번호
  const round = useRecoilValue(roundState);

  const handleClick = () => {
    // 처음사용하면 토큰무료, 그 다음부턴 1토큰
    if (selectedPlayerNumber === undefined && currentPlayer.homeFarmer > 0) {
      // 이미 사용했던 유저라면
      if (usedPlayers.includes(currentPlayer.number)) {
        if (currentPlayer.food >= 1) {
          setPlayers(
            produce(_players => {
              _players[currentPlayerIndex].food -= 1;
              _players[currentPlayerIndex].homeFarmer -= 1;
            })
          );
        } else {
          alert('음식이 부족합니다.');
          return;
        }
      } else {
        setPlayers(
          produce(_players => {
            _players[currentPlayerIndex].homeFarmer -= 1;
          })
        );
        setUsedPlayers(prev => [...prev, currentPlayer.number]);
      }

      setSelectedPlayerNumber(currentPlayer.number);
      nextPlayer();
    }
  };

  useEffect(() => {
    setSelectedPlayerNumber(undefined);
  }, [round]);

  return (
    <ActionContainer
      width={115}
      height={94}
      top={406}
      left={30}
      isActive
      title="교습"
      onClick={handleClick}
      userNumber={selectedPlayerNumber}
    >
      <ContentWrapper>
        <Wrapper>
          <Text>1</Text>
          <MeepleFood width={15} height={15} />
          <Text>내기</Text>
        </Wrapper>
        <Wrapper>
          <Text>1</Text>
          <MeepleOccupation width={30} height={25} />
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
  font-size: 14px;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
