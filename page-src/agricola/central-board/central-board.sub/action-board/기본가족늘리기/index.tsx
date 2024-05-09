import { roundState } from '@/shared/recoil';
import { MeepleChild } from '@/shared/resource/meeple-child';
import { MeepleMinor } from '@/shared/resource/meeple-minor';
import styled from '@emotion/styled';
import { ActionContainer } from 'page-src/agricola/central-board/central-board.sub/action-board/shared/components/action-container';
import { useCurrentPlayer } from 'page-src/agricola/shared/hooks/use-current-player';
import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { produce } from 'immer';

// TODO: 보조설비 사용기능 추가
export const 기본가족늘리기 = () => {
  const { currentPlayer, setPlayers, currentPlayerIndex, nextPlayer } = useCurrentPlayer();
  const round = useRecoilValue(roundState);
  const [isActive, setIsActive] = useState(false);
  const [selectedPlayerNumber, setSelectedPlayerNumber] = useState<undefined | number>(undefined);

  const handleClick = () => {
    // 조건 추가: 가족을 넣을 농장이 있는지 확인
    const isEmptyRoom = currentPlayer.slots.some(
      slot => slot.resource === null && slot.type === '방'
    );
    if (!isEmptyRoom) {
      alert('빈방이 없어유!');
      return;
    }

    if (selectedPlayerNumber === undefined && currentPlayer.homeFarmer > 0) {
      setPlayers(
        produce(_players => {
          _players[currentPlayerIndex].baby += 1;
          _players[currentPlayerIndex].homeFarmer -= 1;
        })
      );
      setSelectedPlayerNumber(currentPlayer.number);
      nextPlayer();
    }
  };

  useEffect(() => {
    if (round >= 6) {
      setIsActive(true);
    }
  }, [round]);

  return (
    <ActionContainer
      width={140}
      height={140}
      top={156}
      left={493}
      backNumber={2}
      isActive={isActive}
      title="기본가족늘리기"
      onClick={handleClick}
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
