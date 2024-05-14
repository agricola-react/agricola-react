import { currentActionState, roundState } from '@/shared/recoil';
import { MeepleBread } from '@/shared/resource/meeple-bread';
import { MeepleSow } from '@/shared/resource/meeple-sow';
import styled from '@emotion/styled';
import { ActionContainer } from 'page-src/agricola/central-board/central-board.sub/action-board/shared/components/action-container';
import { useCurrentPlayer } from 'page-src/agricola/shared/hooks/use-current-player';
import { isExistEmptyField } from 'page-src/agricola/shared/utils/harvest';
import { isExistAtLeastOne } from 'page-src/agricola/shared/utils/validate-slot';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

export const 곡식활용 = () => {
  const round = useRecoilValue(roundState);
  const [isActive, setIsActive] = useState(false);

  const [action, setAction] = useRecoilState(currentActionState);
  const { currentPlayer } = useCurrentPlayer();
  const [selectedPlayerNumber, setSelectedPlayerNumber] = useState<undefined | number>();

  const handleClick = () => {
    if (action !== null) {
      alert(`[${currentPlayer.name}] 님의 액션을 완료해주세요.`);
      return;
    }

    if (selectedPlayerNumber !== undefined) return;

    if (!isExistAtLeastOne(currentPlayer.slots, '밭')) {
      alert(`[곡식활용] 씨앗을 뿌리기 위해서는 농지가 필요합니다.`);
      return;
    }

    if (currentPlayer.grain === 0 && currentPlayer.vegetable === 0) {
      alert(`[곡식활용] 곡식 혹은 채소가 적어도 하나는 있어야 합니다.`);
      return;
    }

    if (!isExistEmptyField(currentPlayer.slots)) {
      alert(`[곡식활용] 비어있는 농지가 없습니다.`);
      return;
    }

    setAction('씨뿌리기');
    setSelectedPlayerNumber(currentPlayer.number);
  };

  useEffect(() => {
    if (round >= 1) {
      setIsActive(true);
    }
    setSelectedPlayerNumber(undefined);
  }, [round]);

  return (
    <ActionContainer
      width={140}
      height={140}
      top={2}
      left={167}
      backNumber={1}
      isActive={isActive}
      title="곡식활용"
      onClick={handleClick}
      userNumber={selectedPlayerNumber}
    >
      <ContentWrapper>
        <Wrapper>
          <ContentWrapper>
            <MeepleSow width={35} height={30} />
            <div className="font-bold">+</div>
            <MeepleBread width={30} height={20} />
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
