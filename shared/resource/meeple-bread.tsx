import styled from '@emotion/styled';

type Props = {
  width: number;
  height: number;
};

export const MeepleBread = ({ width, height }: Props) => {
  return <Container width={width} height={height} />;
};

const Container = styled.div<{ width: number; height: number }>`
  background-image: url('/resource.webp');
  background-repeat: no-repeat;
  background-position: 0.526316% 21.8989%;
  background-size: 1383.78%;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`;
