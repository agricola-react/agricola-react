import styled from '@emotion/styled';

type Props = {
  width: number;
  height: number;
};

export const RoomWood = ({ width, height }: Props) => {
  return <Container width={width} height={height} />;
};

const Container = styled.div<{ width: number; height: number }>`
  background-image: url('/resource.webp');
  background-position: 74.5923% 8.62506%;
  background-size: 1393.2%;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`;
