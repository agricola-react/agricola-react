import styled from '@emotion/styled';

type Props = {
  width: number;
  height: number;
};

export const MeepleSheep = ({ width, height }: Props) => {
  return <Container width={width} height={height} />;
};

const Container = styled.div<{ width: number; height: number }>`
  background-image: url('/resource.webp');
  background-repeat: no-repeat;
  background-position: 80.7692% 8.62069%;
  background-size: 2089.8%;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`;
