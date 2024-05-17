import { currentActionState, roundState } from '@/shared/recoil';
import { MeepleFood } from '@/shared/resource/meeple-food';
import { Reed } from '@/shared/resource/reed';
import { Stone } from '@/shared/resource/stone';
import styled from '@emotion/styled';
import { produce } from 'immer';
import { ActionContainer } from 'page-src/agricola/central-board/central-board.sub/action-board/shared/components/action-container';
import { useCurrentPlayer } from 'page-src/agricola/shared/hooks/use-current-player';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

export const ResourceMarket = () => {
  const { currentPlayer, setPlayers, currentPlayerIndex, nextPlayer } = useCurrentPlayer();
  const [selectedPlayerNumber, setSelectedPlayerNumber] = useState<undefined | number>(undefined);
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

    setPlayers(
      produce(_players => {
        _players[currentPlayerIndex].food += 1;
        _players[currentPlayerIndex].stone += 1;
        _players[currentPlayerIndex].reed += 1;
        _players[currentPlayerIndex].homeFarmer -= 1;
      })
    );
    setSelectedPlayerNumber(currentPlayer.number);
    nextPlayer();
  };

  useEffect(() => {
    setSelectedPlayerNumber(undefined);
  }, [round]);

  return (
    <>
      <ActionContainer
        width={200}
        height={150}
        top={320}
        left={15}
        isActive
        title="자원시장"
        onClick={handleClick}
        userNumber={selectedPlayerNumber}
      >
        <ContentWrapper>
          <Description>+1</Description>
          <Reed width={15} height={15} />
          <Description>+1</Description>
          <Stone width={15} height={15} />
          <Description>+1</Description>
          <MeepleFood width={15} height={15} />
        </ContentWrapper>
      </ActionContainer>
    </>
  );
};

const ContentWrapper = styled.div`
  align-items: center;
  display: flex;
  gap: 10px;
  height: 100%;
  justify-content: center;
  width: 100%;
`;

const Description = styled.div`
  font-weight: bold;
`;
