import { MeepleField } from "@/shared/resource/meeple-field";
import { MeepleSow } from "@/shared/resource/meeple-sow";
import styled from "@emotion/styled";
import { ActionContainer } from "page-src/agricola/central-board/central-board.sub/action-board/shared/components/action-container";

export const 밭농사 = () => {
  return (
    <ActionContainer width={140} height={140} top={626} left={6} title="밭농사">
      <ContentWrapper>
        <Wrapper>
          <ContentWrapper>
            <MeepleField width={40} height={20} />
            <div className="font-bold">+</div>
            <MeepleSow width={35} height={30} />
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
