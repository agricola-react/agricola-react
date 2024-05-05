import styled from '@emotion/styled';

type Props = {
  width: number;
  height: number;
};

export const MeepleFood = ({ width, height }: Props) => {
  return <Container width={width} height={height} />;
};

const Container = styled.div<{ width: number; height: number }>`
  background-image: url('/resource.webp');
  background-repeat: no-repeat;
  background-position: 41.0061% 21.7988%;
  background-size: 2560%;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`;
