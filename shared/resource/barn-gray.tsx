import styled from '@emotion/styled';

type Props = {
  width: number;
  height: number;
};

export const BarnGray = ({ width, height }: Props) => {
  return <Container width={width} height={height} />;
};

const Container = styled.div<{ width: number; height: number }>`
  background-image: url('/stables.webp');
  background-repeat: no-repeat;
  background-position-x: 100%;
  background-size: 500% 100%;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`;
