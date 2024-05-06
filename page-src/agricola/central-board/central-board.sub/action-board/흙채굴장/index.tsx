import { 누적자원State } from '@/shared/recoil/누적자원/atoms';
import { Clay } from '@/shared/resource/clay';
import styled from '@emotion/styled';
import { ActionContainer } from 'page-src/agricola/central-board/central-board.sub/action-board/shared/components/action-container';
import { useRecoilValue } from 'recoil';

export const 흙채굴장 = () => {
  const accumResources = useRecoilValue(누적자원State);
  return (
    <ActionContainer width={140} height={86} top={306} left={167} title="흙채굴장">
      <ContentWrapper>
        <Wrapper>
          <Text>1</Text>
          <Clay width={15} height={17} />
        </Wrapper>
        <Wrapper>
          <div>누적 {accumResources.resources.get('흙채굴장')?.count}개</div>
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
  height: 100px;
`;
