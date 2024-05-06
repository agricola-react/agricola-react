import styled from '@emotion/styled';

type Props = {
  width: number;
  height: number;
};

export const MeepleCattle = ({ width, height }: Props) => {
  return <Container width={width} height={height} />;
};

const Container = styled.div<{ width: number; height: number }>`
  background-image: url('/resource.webp');
  background-repeat: no-repeat;
  background-position: 18.57% 21.821%;
  background-size: 1969.23%;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`;
