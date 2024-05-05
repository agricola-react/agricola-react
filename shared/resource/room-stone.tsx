import styled from '@emotion/styled';

type Props = {
  width: number;
  height: number;
};

export const RoomStone = ({ width, height }: Props) => {
  return <Container width={width} height={height} />;
};

const Container = styled.div<{ width: number; height: number }>`
  background-image: url('/resource.webp');
  background-position: 71.6544% 21.7766%;
  background-size: 1365.33%;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`;
