import styled from '@emotion/styled';

type Props = {
  width: number;
  height: number;
};

export const MeepleField = ({ width, height }: Props) => {
  return <Container width={width} height={height} />;
};

const Container = styled.div<{ width: number; height: number }>`
  background-image: url('/resource.webp');
  background-repeat: no-repeat;
  background-position: 43.5094% 15.0415%;
  background-size: 890.435%;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`;
