import styled from '@emotion/styled';

type Props = {
  width: number;
  height: number;
};

export const MeepleFirst = ({ width, height }: Props) => {
  return <Container width={width} height={height} />;
};

const Container = styled.div<{ width: number; height: number }>`
  background-image: url('/resource.webp');
  background-repeat: no-repeat;
  background-position: 93.9333% 0.523834%;
  background-size: 2925.71%;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`;
