import { currentActionState, roundState } from '@/shared/recoil';
import { MeepleChild } from '@/shared/resource/meeple-child';
import { MeepleMinor } from '@/shared/resource/meeple-minor';
import styled from '@emotion/styled';
import { ActionContainer } from 'page-src/agricola/central-board/central-board.sub/action-board/shared/components/action-container';
import { useCurrentPlayer } from 'page-src/agricola/shared/hooks/use-current-player';
import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { produce } from 'immer';
import { SubCardModal } from 'page-src/agricola/player-board/player-board.sub/card/sub-card-modal';

// TODO: 보조설비 사용기능 추가
export const 기본가족늘리기 = () => {
  const { currentPlayer, setPlayers, currentPlayerIndex, nextPlayer } = useCurrentPlayer();
  const round = useRecoilValue(roundState);
  const [isActive, setIsActive] = useState(false);
  const [selectedPlayerNumber, setSelectedPlayerNumber] = useState<undefined | number>(undefined);
  const action = useRecoilValue(currentActionState);
  const [subCardOpen, setSubCardOpen] = useState(false);
  const [isDone, setIsDone] = useState(false);

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

    const isEmptyRoom = currentPlayer.slots.some(
      slot => slot.resource === null && slot.type === '방'
    );
    if (!isEmptyRoom) {
      alert('빈방이 없어유!');
      return;
    }

    setSelectedPlayerNumber(currentPlayer.number);
    setSubCardOpen(true);
  };

  useEffect(() => {
    if (round >= 6) {
      setIsActive(true);
      setSelectedPlayerNumber(undefined);
    }
  }, [round]);

  // 보조카드를 선택한 후엥 nextPlayer() 호출
  useEffect(() => {
    if (isDone) {
      setPlayers(
        produce(_players => {
          _players[currentPlayerIndex].baby += 1;
          _players[currentPlayerIndex].homeFarmer -= 1;
        })
      );

      nextPlayer();
      setIsDone(false);
    }
  }, [isDone]);

  return (
    <>
      <ActionContainer
        width={140}
        height={140}
        top={156}
        left={493}
        backNumber={2}
        isActive={isActive}
        title="기본가족늘리기"
        onClick={handleClick}
        userNumber={selectedPlayerNumber}
      >
        <ContentWrapper>
          <Wrapper>
            <ContentWrapper>
              <MeepleChild width={30} height={35} />
              <div className="font-bold">▷</div>
              <div className="font-bold">1</div>
              <MeepleMinor width={30} height={20} />
            </ContentWrapper>
          </Wrapper>
        </ContentWrapper>
      </ActionContainer>
      <SubCardModal
        open={subCardOpen}
        setOpen={setSubCardOpen}
        player={currentPlayer}
        setIsDone={setIsDone}
        isAction={true}
      />
    </>
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
