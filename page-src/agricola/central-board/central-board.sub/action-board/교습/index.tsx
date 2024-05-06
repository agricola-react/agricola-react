import { MeepleFood } from '@/shared/resource/meeple-food';
import { MeepleOccupation } from '@/shared/resource/meeple-occupation';
import styled from '@emotion/styled';
import { ActionContainer } from 'page-src/agricola/central-board/central-board.sub/action-board/shared/components/action-container';

export const 교습 = () => {
  return (
    <ActionContainer width={115} height={94} top={406} left={30} title="교습">
      <ContentWrapper>
        <Wrapper>
          <Text>1</Text>
          <MeepleFood width={15} height={15} />
          <Text>내기</Text>
        </Wrapper>
        <Wrapper>
          <Text>1</Text>
          <MeepleOccupation width={30} height={25} />
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
  font-size: 14px;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
