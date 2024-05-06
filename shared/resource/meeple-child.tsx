import styled from '@emotion/styled';

type Props = {
  width: number;
  height: number;
};

export const MeepleChild = ({ width, height }: Props) => {
  return <Container width={width} height={height} />;
};

const Container = styled.div<{ width: number; height: number }>`
  background-image: url('/resource.webp');
  background-repeat: no-repeat;
  background-position: 19.0819% 0.562114%;
  background-size: 853.333%;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`;
