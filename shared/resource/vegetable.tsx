import styled from '@emotion/styled';

type Props = {
  width: number;
  height: number;
};

export const Vegetable = ({ width, height }: Props) => {
  return <Container width={width} height={height} />;
};

const Container = styled.div<{ width: number; height: number }>`
  background-image: url('/resource.webp');
  background-position: 77.0791% 21.7325%;
  background-size: 2694.74%;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`;
