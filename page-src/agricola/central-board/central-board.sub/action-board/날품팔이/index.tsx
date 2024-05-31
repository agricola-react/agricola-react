import {
  PlayerAction,
  currentActionState,
  currentRoundNameState,
  roundState,
} from '@/shared/recoil';
import { MeepleFood } from '@/shared/resource/meeple-food';
import styled from '@emotion/styled';
import { produce } from 'immer';
import { ActionContainer } from 'page-src/agricola/central-board/central-board.sub/action-board/shared/components/action-container';
import { useCurrentPlayer } from 'page-src/agricola/shared/hooks/use-current-player';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
const ACTION_TITLE: PlayerAction = '농지';

export const 날품팔이 = () => {
  const { currentPlayer, setPlayers, currentPlayerIndex, nextPlayer } = useCurrentPlayer();
  const [selectedPlayerNumber, setSelectedPlayerNumber] = useState<undefined | number>(undefined);
  const round = useRecoilValue(roundState);
  const [action, setAction] = useRecoilState(currentActionState);
  const [currentRoundName, setCurrentRoundName] = useRecoilState(currentRoundNameState);

  const handleClick = () => {
    if (action !== null) {
      alert(`[${currentPlayer.name}] 님의 액션을 완료해주세요.`);
      return;
    }

    if (selectedPlayerNumber !== undefined) return;
    setSelectedPlayerNumber(currentPlayer.number);
    // 현재턴인 플레이어의 음식을 2 증가시킨다.
    if (currentPlayer.homeFarmer > 0) {
      setPlayers(
        produce(_players => {
          _players[currentPlayerIndex].food += 2;
          _players[currentPlayerIndex].homeFarmer -= 1;
        })
      );
      const 보조경작자소유여부 = currentPlayer.jobCards.find(
        card => card.name === '보조경작자' && card.isActive
      );

      if (보조경작자소유여부) {
        const 보조경작자사용여부 = confirm('밭 1개를 일굴 수 있습니다.');
        if (보조경작자사용여부) {
          setCurrentRoundName('농지');

          const isValid = currentPlayer.slots.some(slot => {
            if (slot.type === null) return true;
            return false;
          });

          if (isValid) {
            setAction({ type: ACTION_TITLE, isDone: false });

            return;
          }
          alert('농지를 설치할 수 있는 칸이 없습니다.');
        }
      }

      nextPlayer();
    }
  };

  useEffect(() => {
    if (action?.type === '농지' && action?.isDone && currentRoundName === '날품팔이') {
      setSelectedPlayerNumber(currentPlayer.number);
      nextPlayer();
    }
  }, [action]);
  useEffect(() => {
    setSelectedPlayerNumber(undefined);
  }, [round]);

  return (
    <ActionContainer
      width={115}
      height={74}
      top={526}
      left={30}
      isActive
      title="날품팔이"
      onClick={handleClick}
      userNumber={selectedPlayerNumber}
    >
      <ContentWrapper>
        <Wrapper>
          <Text>+2</Text>
          <MeepleFood width={15} height={15} />
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
