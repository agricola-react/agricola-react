import styled from '@emotion/styled';

type Props = {
  width: number;
  height: number;
};

export const RoomClay = ({ width, height }: Props) => {
  return <Container width={width} height={height} />;
};

const Container = styled.div<{ width: number; height: number }>`
  background-image: url('/resource.webp');
  background-position: 88.5324% 8.62069%;
  background-size: 1393.2%;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`;
