import styled from '@emotion/styled';
import { Footer } from 'page-src/agricola/central-board/central-board.sub/action-board/shared/components/footer';
import { ReactNode } from 'react';

type Props = {
  title: string;
  width: number;
  height: number;
  top: number;
  left: number;
  children: ReactNode;
};

export const ActionContainer = ({ title, width, height, top, left, children }: Props) => {
  return (
    <>
      <Container width={width} height={height} top={top} left={left}>
        <Wrapper>
          <Title>{title}</Title>
          <DescriptionWrapper>{children}</DescriptionWrapper>
          <Footer />
        </Wrapper>
      </Container>
    </>
  );
};

const Container = styled.div<{ width: number; height: number; top: number; left: number }>`
  height: ${props => props.height}px;
  top: ${props => props.top}px;
  width: ${props => props.width}px;
  left: ${props => props.left}px;
  position: absolute;
`;

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  height: 100%;
  position: relative;
  width: 100%;
  z-index: 10;
`;

const Title = styled.div`
  align-items: center;
  background-image: url('/action_frame.webp');
  background-size: 100% 130px;
  display: flex;
  font-size: 11px;
  height: 32px;
  justify-content: center;
  text-align: center;
  font-weight: bold;
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
  height: 45px;
`;
