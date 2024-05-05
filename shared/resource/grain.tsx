import styled from '@emotion/styled';

type Props = {
  width: number;
  height: number;
};

export const Grain = ({ width, height }: Props) => {
  return <Container width={width} height={height} />;
};

const Container = styled.div<{ width: number; height: number }>`
  background-image: url('/resource.webp');
  background-repeat: no-repeat;
  background-position: 54.5869% 21.7877%;
  background-size: 2730.67%;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`;
