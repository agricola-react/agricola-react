import { MeepleSheep } from '@/shared/resource/meeple-sheep';
import styled from '@emotion/styled';
import { ActionContainer } from 'page-src/agricola/central-board/central-board.sub/action-board/shared/components/action-container';

export const 양시장 = () => {
  return (
    <ActionContainer width={140} height={140} top={1} left={493} title="양시장">
      <ContentWrapper>
        <Wrapper>
          <Text>1</Text>
          <MeepleSheep width={30} height={25} />
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
