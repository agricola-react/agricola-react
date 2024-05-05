import { Reed } from '@/shared/resource/reed';
import styled from '@emotion/styled';
import { ActionContainer } from 'page-src/agricola/central-board/action-board/shared/components/action-container';

export const 갈대밭 = () => {
  return (
    <ActionContainer width={140} height={86} top={411} left={167} title="갈대밭">
      <ContentWrapper>
        <Wrapper>
          <Text>1</Text>
          <Reed width={15} height={17} />
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
