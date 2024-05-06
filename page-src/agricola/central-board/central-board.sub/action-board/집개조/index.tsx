import { MeepleMajor } from '@/shared/resource/meeple-major';
import { MeepleMinor } from '@/shared/resource/meeple-minor';
import { MeepleUpgrade } from '@/shared/resource/meeple-upgrade';
import styled from '@emotion/styled';
import { ActionContainer } from 'page-src/agricola/central-board/central-board.sub/action-board/shared/components/action-container';

export const 집개조 = () => {
  return (
    <ActionContainer
      width={140}
      height={170}
      top={156}
      left={657}
      contentHeight={60}
      title="집개조"
    >
      <Wrapper>
        <MeepleUpgrade width={75} height={30} />
        <ContentWrapper>
          <div className="font-bold">▷</div>
          <div className="font-bold">1</div>
          <MeepleMajor width={30} height={20} />
          <div className="font-bold">/</div>
          <MeepleMinor width={30} height={20} />
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
