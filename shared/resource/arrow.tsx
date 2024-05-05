import styled from '@emotion/styled';

type Props = {
  width: number;
  height: number;
};

export const Arrow = ({ width, height }: Props) => {
  return <Container width={width} height={height} />;
};

const Container = styled.div<{ width: number; height: number }>`
  background-image: url('/resource.webp');
  background-repeat: no-repeat;
  background-position: 98.3359% 21.45%;
  background-size: 3150.77%;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`;
