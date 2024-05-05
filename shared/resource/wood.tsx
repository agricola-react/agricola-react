import styled from '@emotion/styled';

type Props = {
  width: number;
  height: number;
};

export const Wood = ({ width, height }: Props) => {
  return <Container width={width} height={height} />;
};

const Container = styled.div<{ width: number; height: number }>`
  background-image: url('/resource.webp');
  background-repeat: no-repeat;
  background-position: 58.4507% 21.7766%;
  background-size: 3413.33%;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`;
