import { MeepleCattle } from '@/shared/resource/meeple-cattle';
import styled from '@emotion/styled';
import { ActionContainer } from 'page-src/agricola/central-board/central-board.sub/action-board/shared/components/action-container';

export const 소시장 = () => {
  return (
    <ActionContainer width={140} height={140} top={462} left={330} title="소시장">
      <ContentWrapper>
        <Wrapper>
          <Text>1</Text>
          <MeepleCattle width={30} height={25} />
        </Wrapper>
        <Wrapper>
          <div>누적 n개</div>
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
