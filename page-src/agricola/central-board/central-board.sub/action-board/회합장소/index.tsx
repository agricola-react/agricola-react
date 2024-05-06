import { MeepleFirst } from '@/shared/resource/meeple-first';
import { MeepleMinor } from '@/shared/resource/meeple-minor';
import styled from '@emotion/styled';
import { Footer } from 'page-src/agricola/central-board/central-board.sub/action-board/shared/components/footer';

export const 회합장소 = () => {
  return (
    <>
      <Container>
        <Wrapper>
          <Title>회합장소</Title>
          <DescriptionWrapper>
            <MeepleFirst width={10} height={20} />
            <Plus>+1</Plus>
            <MeepleMinor width={15} height={10} />
          </DescriptionWrapper>
          <Footer />
        </Wrapper>
      </Container>
    </>
  );
};

const Container = styled.div`
  position: absolute;
  height: 150px;
  left: 31px;
  top: 134px;
  width: 115px;
  background-image: url('/action_frame.webp');
  background-size: 100% 115px;
  height: 32px;
  display: flex;
  justify-content: center;
`;

const Title = styled.div`
  font-size: 11px;
  margin: 0px;
  margin-top: 10px;
  font-weight: bold;
  text-align: center;
`;

const DescriptionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  background-image: url('/action_frame.webp');
  background-position: 0 -40px;
  background-size: 100% 120px;
  padding-top: 5px;
  height: 35px;
`;

const Wrapper = styled.div`
  width: 100%;
`;

const Plus = styled.div`
  font-weight: bold;
  font-size: 10px;
`;
