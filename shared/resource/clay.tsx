import styled from '@emotion/styled';

type Props = {
  width: number;
  height: number;
};

export const Clay = ({ width, height }: Props) => {
  return <Container width={width} height={height} />;
};

const Container = styled.div<{ width: number; height: number }>`
  background-image: url('/resource.webp');
  background-repeat: no-repeat;
  background-position: 97.127% 8.61196%;
  background-size: 3200%;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`;
