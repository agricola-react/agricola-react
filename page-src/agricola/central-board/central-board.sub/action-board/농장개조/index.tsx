import { Arrow } from '@/shared/resource/arrow';
import { MeepleFence } from '@/shared/resource/meeple-fence';
import { MeepleUpgrade } from '@/shared/resource/meeple-upgrade';
import { Wood } from '@/shared/resource/wood';
import styled from '@emotion/styled';
import { ActionContainer } from 'page-src/agricola/central-board/central-board.sub/action-board/shared/components/action-container';

export const 농장개조 = () => {
  return (
    <ActionContainer
      width={140}
      height={170}
      top={626}
      left={489}
      contentHeight={60}
      title="농장개조"
    >
      <Wrapper>
        <MeepleUpgrade width={75} height={30} />
        <ContentWrapper>
          <div className="font-bold">▷</div>
          <div className="font-bold">1</div>
          <Wood width={15} height={17} />
          <Arrow width={13} height={13} />
          <MeepleFence width={20} height={20} />
        </ContentWrapper>
      </Wrapper>
    </ActionContainer>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;
