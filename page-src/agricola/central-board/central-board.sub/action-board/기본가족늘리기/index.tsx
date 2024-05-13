import { roundState } from '@/shared/recoil';
import { MeepleChild } from '@/shared/resource/meeple-child';
import styled from '@emotion/styled';
import { ActionContainer } from 'page-src/agricola/central-board/central-board.sub/action-board/shared/components/action-container';
import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';

export const 기본가족늘리기 = () => {
  const round = useRecoilValue(roundState);
  const [isActive, setIsActive] = useState(false);

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
