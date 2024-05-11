import { PlayerAction, currentActionState, roundState } from '@/shared/recoil';
import { MeepleField } from '@/shared/resource/meeple-field';
import styled from '@emotion/styled';
import { produce } from 'immer';
import { ActionContainer } from 'page-src/agricola/central-board/central-board.sub/action-board/shared/components/action-container';
import { useCurrentPlayer } from 'page-src/agricola/shared/hooks/use-current-player';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

const ACTION_TITLE: PlayerAction = '농지';

export const 농지 = () => {
  const { currentPlayer, setPlayers, currentPlayerIndex } = useCurrentPlayer();
  const [selectedPlayerNumber, setSelectedPlayerNumber] = useState<undefined | number>();
  const [, setAction] = useRecoilState(currentActionState);
  const round = useRecoilValue(roundState);

  const handleClick = useCallback(() => {
    if (selectedPlayerNumber !== undefined) return;

    const isValid = currentPlayer.slots.some(slot => {
      if (slot.type === null) return true;
      return false;
    });

    if (isValid) {
      setAction(ACTION_TITLE);
      setPlayers(
        produce(_players => {
          _players[currentPlayerIndex].homeFarmer -= 1;
        })
      );
      setSelectedPlayerNumber(currentPlayer.number);
      return;
    }

    alert('농지를 설치할 수 있는 칸이 없습니다.');
  }, [selectedPlayerNumber, currentPlayer]);

  useEffect(() => {
    setSelectedPlayerNumber(undefined);
  }, [round]);

  return (
    <>
      <ActionContainer
        width={112}
        height={80}
        top={310}
        left={30}
        isActive
        title="농지"
        onClick={handleClick}
        userNumber={selectedPlayerNumber}
      >
        <ContentWrapper>
          <MeepleField width={38} height={20} />
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
