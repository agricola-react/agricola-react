import styled from '@emotion/styled';
import { ReactNode } from 'react';

export type RoomType = 'stone' | 'wood' | 'clay';

type Props = {
  width: number;
  height: number;
  roomType: RoomType;
  index: number; // 슬롯의 위치
  children?: ReactNode;
};

export const Room = ({ width, height, roomType, index, children }: Props) => {
  const positionX =
    roomType === 'wood' ? 0 : roomType === 'clay' ? 50 : roomType === 'stone' ? 100 : 0;

  return (
    <Container width={width} height={height} positionX={positionX}>
      {children}
    </Container>
  );
};

const Container = styled.div<{ width: number; height: number; positionX: number }>`
  background-image: url('/rooms.webp');
  background-position-x: ${props => props.positionX}%;
  background-size: 300% 100%;
  background-repeat: no-repeat;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`;
