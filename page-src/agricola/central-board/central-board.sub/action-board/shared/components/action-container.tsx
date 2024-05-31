import { BackNumber } from '@/shared/resource/back-number';
import { Farmer } from '@/shared/resource/farmer';
import styled from '@emotion/styled';
import { Footer } from 'page-src/agricola/central-board/central-board.sub/action-board/shared/components/footer';
import { ReactNode } from 'react';

type Props = {
  title: string;
  width: number;
  height: number;
  contentHeight?: number;
  top: number;
  left: number;
  isActive: boolean;
  children: ReactNode;
  userNumber?: number;
  descriptionHeight?: number;
  backNumber?: number;
  onClick: () => void;
};

export const ActionContainer = ({
  title,
  width,
  height,
  top,
  left,
  contentHeight,
  isActive,
  children,
  descriptionHeight,
  userNumber,
  backNumber,
  onClick,
}: Props) => {
  const isFamily = title.includes('가족');

  return (
    <Container width={width} height={height} top={top} left={left} onClick={onClick}>
      {!isActive && <BackNumber backNumber={backNumber} />}
      {isActive && (
        <Wrapper>
          <Title>{title}</Title>
          <DescriptionWrapper contentHeight={contentHeight} descriptionHeight={descriptionHeight}>
            {children}
          </DescriptionWrapper>
          <Footer />
        </Wrapper>
      )}
      {true && userNumber && (
        <UserContainer>
          <Farmer width={30} height={40} userNumber={userNumber} />
          {isFamily && (
            <div className="relative top-[-30px] left-[30px]">
              <Farmer width={20} height={30} userNumber={userNumber} />
            </div>
          )}
        </UserContainer>
      )}
    </Container>
  );
};

const Container = styled.div<{ width: number; height: number; top: number; left: number }>`
  height: ${props => props.height}px;
  top: ${props => props.top}px;
  width: ${props => props.width}px;
  left: ${props => props.left}px;
  position: absolute;
  cursor: pointer;
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

const DescriptionWrapper = styled.div<{ contentHeight?: number; descriptionHeight?: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  background-image: url('/action_frame.webp');
  background-position: 0 -40px;
  background-size: ${props =>
    !props.descriptionHeight ? '100% 120px' : `100% ${props.descriptionHeight}px`};
  padding-top: 5px;
  height: ${props => props.contentHeight ?? 45}px;
`;

const UserContainer = styled.div`
  position: absolute;
  top: 30px;
  left: 40%;
  z-index: 11;
`;
