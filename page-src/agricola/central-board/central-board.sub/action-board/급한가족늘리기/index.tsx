import { currentActionState, roundState } from '@/shared/recoil';
import { MeepleChild } from '@/shared/resource/meeple-child';
import styled from '@emotion/styled';
import { ActionContainer } from 'page-src/agricola/central-board/central-board.sub/action-board/shared/components/action-container';
import { useCurrentPlayer } from 'page-src/agricola/shared/hooks/use-current-player';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

export const 급한가족늘리기 = () => {
  const round = useRecoilValue(roundState);
  const [isActive, setIsActive] = useState(false);
  const [selectedPlayerNumber, setSelectedPlayerNumber] = useState<number | undefined>();

  const action = useRecoilValue(currentActionState);
  const { currentPlayer } = useCurrentPlayer();

  const handleClick = () => {
    if (action !== null) {
      alert(`[${currentPlayer.name}] 님의 액션을 완료해주세요.`);
      return;
    }

    if (selectedPlayerNumber !== undefined) return;
  };

  useEffect(() => {
    if (round >= 13) {
      setIsActive(true);
    }
  }, [round]);

  return (
    <ActionContainer
      width={140}
      height={140}
      top={626}
      left={167}
      backNumber={5}
      isActive={isActive}
      title="급한가족늘리기"
      onClick={handleClick}
    >
      <ContentWrapper>
        <Wrapper>
          <ContentWrapper>
            <MeepleChild width={30} height={35} />
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
