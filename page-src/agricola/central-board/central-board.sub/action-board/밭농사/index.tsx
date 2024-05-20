import { currentActionState, currentRoundNameState, roundState } from '@/shared/recoil';
import { MeepleField } from '@/shared/resource/meeple-field';
import { MeepleSow } from '@/shared/resource/meeple-sow';
import styled from '@emotion/styled';
import { produce } from 'immer';
import { ActionContainer } from 'page-src/agricola/central-board/central-board.sub/action-board/shared/components/action-container';
import { useCurrentPlayer } from 'page-src/agricola/shared/hooks/use-current-player';
import { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

export const 밭농사 = () => {
  const round = useRecoilValue(roundState);
  const [isActive, setIsActive] = useState(false);

  const [action, setAction] = useRecoilState(currentActionState);
  const { currentPlayer, nextPlayer, setPlayers } = useCurrentPlayer();
  const [selectedPlayerNumber, setSelectedPlayerNumber] = useState<undefined | number>();
  const [currentRoundName, setCurrentRoundName] = useRecoilState(currentRoundNameState);

  const handleClick = () => {
    if (action !== null) {
      alert(`[${currentPlayer.name}] 님의 액션을 완료해주세요.`);
      return;
    }
    if (selectedPlayerNumber !== undefined) return;

    setCurrentRoundName('밭농사');

    const isValid = currentPlayer.slots.some(slot => {
      if (slot.type === null) return true;
      return false;
    });

    setSelectedPlayerNumber(currentPlayer.number);
    if (isValid) {
      const 밭농사하는지 = confirm(`[밭농사] 밭농사를 하시겠습니까?`);
      if (밭농사하는지) {
        setAction({ type: '농지', isDone: false });
      } else {
        setAction({ type: '씨뿌리기', isDone: false });
      }
    }
  };

  useEffect(() => {
    if (round >= 12) {
      setIsActive(true);
      setSelectedPlayerNumber(undefined);
    }
  }, [round]);

  useEffect(() => {
    if (action?.type === '농지' && action?.isDone && currentRoundName === '밭농사') {
      const 씨뿌리기할건지 = confirm(`[${currentPlayer.name}] 님, 씨를 뿌리시겠습니까?`);

      if (씨뿌리기할건지) {
        setAction({
          type: '씨뿌리기',
          isDone: false,
        });
      } else {
        setPlayers(
          produce(_players => {
            _players[currentPlayer.number - 1].homeFarmer -= 1;
          })
        );
        setAction(null);
        nextPlayer();
      }
    }

    if (action?.type === '씨뿌리기' && action?.isDone && currentRoundName === '밭농사') {
      setPlayers(
        produce(_players => {
          _players[currentPlayer.number - 1].homeFarmer -= 1;
        })
      );
      setAction(null);
      nextPlayer();
    }
  }, [action]);

  return (
    <ActionContainer
      width={140}
      height={140}
      top={626}
      left={6}
      isActive={isActive}
      backNumber={5}
      title="밭농사"
      onClick={handleClick}
      userNumber={selectedPlayerNumber}
    >
      <ContentWrapper>
        <Wrapper>
          <ContentWrapper>
            <MeepleField width={40} height={20} />
            <div className="font-bold">+</div>
            <MeepleSow width={35} height={30} />
          </ContentWrapper>
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

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;
