import { MeepleChild } from "@/shared/resource/meeple-child";
import styled from "@emotion/styled";
import { ActionContainer } from "page-src/agricola/central-board/central-board.sub/action-board/shared/components/action-container";

export const 기본가족늘리기 = () => {
  return (
    <ActionContainer
      width={140}
      height={140}
      top={156}
      left={493}
      title="기본가족늘리기"
    >
      <ContentWrapper>
        <Wrapper>
          <ContentWrapper>
            <MeepleChild width={30} height={35} />
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

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;
