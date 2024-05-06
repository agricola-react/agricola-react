import { MeepleFood } from '@/shared/resource/meeple-food';
import styled from '@emotion/styled';
import { ActionContainer } from 'page-src/agricola/central-board/central-board.sub/action-board/shared/components/action-container';

export const 날품팔이 = () => {
  return (
    <ActionContainer width={115} height={74} top={526} left={30} title="날품팔이">
      <ContentWrapper>
        <Wrapper>
          <Text>+2</Text>
          <MeepleFood width={15} height={15} />
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
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
