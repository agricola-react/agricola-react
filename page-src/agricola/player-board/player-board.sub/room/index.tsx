import styled from '@emotion/styled';

type RoomType = 'stone' | 'wood' | 'clay';

type Props = {
  width: number;
  height: number;
  roomType: RoomType;
};

export const Room = ({ width, height, roomType }: Props) => {
  const positionX =
    roomType === 'wood' ? 0 : roomType === 'clay' ? 50 : roomType === 'stone' ? 100 : 0;
  return <Container width={width} height={height} positionX={positionX}></Container>;
};

const Container = styled.div<{ width: number; height: number; positionX: number }>`
  background-image: url('/rooms.webp');
  background-position-x: ${props => props.positionX}%;
  background-size: 300% 100%;
  background-repeat: no-repeat;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`;
