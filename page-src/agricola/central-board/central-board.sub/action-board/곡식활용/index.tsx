import { roundState } from '@/shared/recoil';
import { MeepleBread } from '@/shared/resource/meeple-bread';
import { MeepleSow } from '@/shared/resource/meeple-sow';
import styled from '@emotion/styled';
import { ActionContainer } from 'page-src/agricola/central-board/central-board.sub/action-board/shared/components/action-container';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

export const 곡식활용 = () => {
  const round = useRecoilValue(roundState);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (round >= 1) {
      setIsActive(true);
    }
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
