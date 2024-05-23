import { roundState } from '@/shared/recoil';
import { MeepleMajor } from '@/shared/resource/meeple-major';
import { MeepleMinor } from '@/shared/resource/meeple-minor';
import styled from '@emotion/styled';
import { produce } from 'immer';
import { ActionContainer } from 'page-src/agricola/central-board/central-board.sub/action-board/shared/components/action-container';
import { SelectModal } from 'page-src/agricola/central-board/central-board.sub/action-board/설비/설비.sub/select-modal';
import { useCurrentPlayer } from 'page-src/agricola/shared/hooks/use-current-player';
import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';

export const 설비 = () => {
  const round = useRecoilValue(roundState);
  const { currentPlayer, nextPlayer, setPlayers } = useCurrentPlayer();
  const [selectedPlayerNumber, setSelectedPlayerNumber] = useState<undefined | number>(undefined);
  const [openSelectModal, setSelectModal] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const [isDone, setIsDone] = useState(false);

  const handleClick = () => {
    if (!isActive) return;

    if (selectedPlayerNumber !== undefined) {
      alert('이미 선택한 플레이어입니다!!');
      return;
    }

    if (currentPlayer.homeFarmer === 0) {
      alert('홈파머가 부족합니다.');
      return;
    }

    setSelectedPlayerNumber(currentPlayer.number);

    setPlayers(
      produce(_players => {
        _players[currentPlayer.number - 1].homeFarmer -= 1;
      })
    );

    setSelectModal(true);
  };

  useEffect(() => {
    if (round >= 2) {
      setIsActive(true);
      setSelectedPlayerNumber(undefined);
    }
  }, [round]);

  useEffect(() => {
    if (isDone) {
      nextPlayer();
      setIsDone(false);
    }
  }, [isDone]);

  return (
    <>
      <ActionContainer
        width={140}
        height={140}
        top={2}
        left={331}
        isActive={isActive}
        backNumber={1}
        title="설비"
        onClick={handleClick}
        userNumber={selectedPlayerNumber}
      >
        <ContentWrapper>
          <Wrapper>
            <ContentWrapper>
              <div className="font-bold">1</div>
              <MeepleMajor width={30} height={20} />
              <div className="font-bold">/</div>
              <MeepleMinor width={30} height={20} />
            </ContentWrapper>
          </Wrapper>
        </ContentWrapper>
      </ActionContainer>
      <SelectModal open={openSelectModal} setOpen={setSelectModal} setIsDone={setIsDone} />
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
