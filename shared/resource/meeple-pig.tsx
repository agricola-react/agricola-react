import styled from '@emotion/styled';

type Props = {
  width: number;
  height: number;
};

export const MeeplePig = ({ width, height }: Props) => {
  return <Container width={width} height={height} />;
};

const Container = styled.div<{ width: number; height: number }>`
  background-image: url('/resource.webp');
  background-repeat: no-repeat;
  background-position: 63.8342% 21.7766%;
  background-size: 1735.59%;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`;
