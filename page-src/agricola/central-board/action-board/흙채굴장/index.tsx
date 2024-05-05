import { Clay } from '@/shared/resource/clay';
import styled from '@emotion/styled';
import { ActionContainer } from 'page-src/agricola/central-board/action-board/shared/components/action-container';

export const 흙채굴장 = () => {
  return (
    <ActionContainer width={140} height={86} top={306} left={167} title="흙채굴장">
      <ContentWrapper>
        <Wrapper>
          <Text>1</Text>
          <Clay width={15} height={17} />
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
