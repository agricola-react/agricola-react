import { currentActionState, roundState } from '@/shared/recoil';
import { MeepleSheep } from '@/shared/resource/meeple-sheep';
import styled from '@emotion/styled';
import { ActionContainer } from 'page-src/agricola/central-board/central-board.sub/action-board/shared/components/action-container';
import { useCurrentPlayer } from 'page-src/agricola/shared/hooks/use-current-player';
import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { produce } from 'immer';

export const 양시장 = () => {
  const [isActive, setIsActive] = useState(true);
  const { currentPlayer, setPlayers, currentPlayerIndex, nextPlayer } = useCurrentPlayer();
  const [selectedPlayerNumber, setSelectedPlayerNumber] = useState<undefined | number>(undefined);
  const [currentSheep, setCurrentSheep] = useState(10);
  const round = useRecoilValue(roundState);
  const action = useRecoilValue(currentActionState);

  const handleClick = () => {
    if (action !== null) {
      alert(`[${currentPlayer.name}] 님의 액션을 완료해주세요.`);
      return;
    }

    if (selectedPlayerNumber !== undefined) return;

    // 현재턴인 플레이어의 갈대 음식을 1 증가시킨다.(누적됨)
    if (isActive && currentPlayer.homeFarmer > 0) {
      setPlayers(
        produce(_players => {
          _players[currentPlayerIndex].sheep += currentSheep;
          _players[currentPlayerIndex].homeFarmer -= 1;
        })
      );
      setCurrentSheep(0);
      setSelectedPlayerNumber(currentPlayer.number);
      nextPlayer();
    }
  };

  useEffect(() => {
    if (round >= 3) {
      setIsActive(true);
      setCurrentSheep(prev => prev + 1);
      setSelectedPlayerNumber(undefined);
    }
  }, [round]);
  return (
    <ActionContainer
      width={140}
      height={140}
      top={1}
      left={493}
      isActive={isActive}
      backNumber={1}
      title="양시장"
      onClick={handleClick}
      userNumber={selectedPlayerNumber}
    >
      <ContentWrapper>
        <Wrapper>
          <Text>1</Text>
          <MeepleSheep width={30} height={25} />
        </Wrapper>
        <Wrapper>
          <div>누적 {currentSheep}개</div>
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
