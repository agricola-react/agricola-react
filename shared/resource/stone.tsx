import styled from '@emotion/styled';

type Props = {
  width: number;
  height: number;
};

export const Stone = ({ width, height }: Props) => {
  return <Container width={width} height={height} />;
};

const Container = styled.div<{ width: number; height: number }>`
  background-image: url('/resource.webp');
  background-position: 36.9456% 21.7988%;
  background-size: 3200%;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`;
