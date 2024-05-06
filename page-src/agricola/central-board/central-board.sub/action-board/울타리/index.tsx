import { Arrow } from '@/shared/resource/arrow';
import { MeepleFence } from '@/shared/resource/meeple-fence';
import { Wood } from '@/shared/resource/wood';
import styled from '@emotion/styled';
import { ActionContainer } from 'page-src/agricola/central-board/central-board.sub/action-board/shared/components/action-container';

export const 울타리 = () => {
  return (
    <ActionContainer width={140} height={140} top={2} left={167} title="울타리">
      <ContentWrapper>
        <Wrapper>
          <ContentWrapper>
            <Text>1</Text>
            <Wood width={15} height={17} />
            <Arrow width={13} height={13} />
            <MeepleFence width={20} height={20} />
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

const Text = styled.div`
  font-weight: bold;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
