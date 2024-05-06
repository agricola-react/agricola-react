import styled from '@emotion/styled';

type Props = {
  width: number;
  height: number;
  userNumber?: number;
};

export const Barn = ({ width, height, userNumber }: Props) => {
  const positionX =
    userNumber === 1
      ? 0
      : userNumber === 2
        ? 25
        : userNumber === 3
          ? 50
          : userNumber === 4
            ? 75
            : 100;

  return <Container width={width} height={height} positionX={positionX} />;
};

const Container = styled.div<{ width: number; height: number; positionX: number }>`
  background-image: url('/stables.webp');
  background-repeat: no-repeat;
  background-position-x: ${props => props.positionX}%;
  background-size: 500% 100%;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`;
