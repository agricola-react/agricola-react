import { Grain } from '@/shared/resource/grain';
import styled from '@emotion/styled';
import { ActionContainer } from 'page-src/agricola/central-board/central-board.sub/action-board/shared/components/action-container';

export const 곡식종자 = () => {
  return (
    <>
      <ActionContainer width={115} height={69} top={220} left={30} title="곡식종자">
        <ContentWrapper>
          <Description>+1</Description>
          <Grain width={15} height={15} />
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

const Description = styled.div`
  font-weight: bold;
`;
