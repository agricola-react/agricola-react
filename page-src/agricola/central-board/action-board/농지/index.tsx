import { MeepleField } from '@/shared/resource/meeple-field';
import styled from '@emotion/styled';
import { ActionContainer } from 'page-src/agricola/central-board/action-board/shared/components/action-container';

export const 농지 = () => {
  return (
    <>
      <ActionContainer width={112} height={80} top={310} left={30} title="농지">
        <ContentWrapper>
          <MeepleField width={38} height={20} />
        </ContentWrapper>
      </ActionContainer>
    </>
  );
};

const ContentWrapper = styled.div`
  align-items: center;
  display: flex;
  gap: 10px;
  height: 100%;
  justify-content: center;
  width: 100%;
`;
