import styled from '@emotion/styled';

type Props = {
  width: number;
  height: number;
};

export const MeepleMajor = ({ width, height }: Props) => {
  return <Container width={width} height={height} />;
};

const Container = styled.div<{ width: number; height: number }>`
  background-image: url('/resource.webp');
  background-repeat: no-repeat;
  background-position: 8.08903% 15.0728%;
  background-size: 994.175%;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`;
