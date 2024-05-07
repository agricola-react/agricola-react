import { MeepleMajor } from "@/shared/resource/meeple-major";
import { MeepleMinor } from "@/shared/resource/meeple-minor";
import styled from "@emotion/styled";
import { ActionContainer } from "page-src/agricola/central-board/central-board.sub/action-board/shared/components/action-container";

export const 설비 = () => {
  return (
    <ActionContainer width={140} height={140} top={2} left={331} title="설비">
      <ContentWrapper>
        <Wrapper>
          <ContentWrapper>
            <div className="font-bold">1</div>
            <MeepleMajor width={30} height={20} />
            <div className="font-bold">/</div>
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
