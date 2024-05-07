import { MeepleChild } from "@/shared/resource/meeple-child";
import { MeepleMinor } from "@/shared/resource/meeple-minor";
import styled from "@emotion/styled";
import { ActionContainer } from "page-src/agricola/central-board/central-board.sub/action-board/shared/components/action-container";

export const 급한가족늘리기 = () => {
  return (
    <ActionContainer
      width={140}
      height={140}
      top={626}
      left={6}
      title="급한가족늘리기"
    >
      <ContentWrapper>
        <Wrapper>
          <ContentWrapper>
            <MeepleChild width={30} height={35} />
            <div className="font-bold">▷</div>
            <div className="font-bold">1</div>
            <MeepleMinor width={30} height={20} />
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
