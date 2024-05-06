import { Vegetable } from '@/shared/resource/vegetable';
import styled from '@emotion/styled';
import { ActionContainer } from 'page-src/agricola/central-board/central-board.sub/action-board/shared/components/action-container';

export const 채소종자 = () => {
  return (
    <ActionContainer width={140} height={140} top={311} left={330} title="채소종자">
      <ContentWrapper>
        <Wrapper>
          <Text>+1</Text>
          <Vegetable width={20} height={25} />
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
