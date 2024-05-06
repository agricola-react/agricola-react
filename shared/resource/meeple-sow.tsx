import styled from '@emotion/styled';

type Props = {
  width: number;
  height: number;
};

export const MeepleSow = ({ width, height }: Props) => {
  return <Container width={width} height={height} />;
};

const Container = styled.div<{ width: number; height: number }>`
  background-image: url('/resource.webp');
  background-repeat: no-repeat;
  background-position: 0.580383% 0.56243%;
  background-size: 630.154%;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`;
