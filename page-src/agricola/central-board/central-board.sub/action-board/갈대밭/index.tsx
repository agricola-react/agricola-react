import { 누적자원State } from '@/shared/recoil/누적자원/atoms';
import { Reed } from '@/shared/resource/reed';
import styled from '@emotion/styled';
import { ActionContainer } from 'page-src/agricola/central-board/central-board.sub/action-board/shared/components/action-container';
import { useRecoilState } from 'recoil';

const ACTION_KEY = '갈대밭';

export const 갈대밭 = () => {
  const [accumResources, setAccumResources] = useRecoilState(누적자원State);

  const handleVisit = () => {
    alert('갈대밭 액션칸 방문');
    setAccumResources(prev => {
      const nextResources = new Map(prev.resources);
      const prevValue = prev.resources.get(ACTION_KEY);
      if (prevValue === undefined) return prev;
      nextResources.set(ACTION_KEY, { ...prevValue, count: 0 });
      return { resources: nextResources };
    });
  };

  return (
    <ActionContainer
      width={140}
      height={86}
      top={411}
      left={167}
      title="갈대밭"
      onClick={handleVisit}
    >
      <ContentWrapper>
        <Wrapper>
          <Text>1</Text>
          <Reed width={15} height={17} />
        </Wrapper>
        <Wrapper>
          <div>누적 {accumResources.resources.get('갈대밭')?.count}개</div>
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
