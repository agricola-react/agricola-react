import styled from '@emotion/styled';

type Props = {
  width: number;
  height: number;
};

export const MeepleUpgrade = ({ width, height }: Props) => {
  return <Container width={width} height={height} />;
};

const Container = styled.div<{ width: number; height: number }>`
  background-image: url('/resource.webp');
  background-repeat: no-repeat;
  background-position: 54.866% 0.552181%;
  background-size: 325.079%;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`;
