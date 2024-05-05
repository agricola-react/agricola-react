import styled from '@emotion/styled';

type Props = {
  width: number;
  height: number;
};

export const MeepleOccupation = ({ width, height }: Props) => {
  return <Container width={width} height={height} />;
};

const Container = styled.div<{ width: number; height: number }>`
  background-image: url('/resource.webp');
  background-repeat: no-repeat;
  background-position: 31.3279% 15.0571%;
  background-size: 1008.87%;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`;
