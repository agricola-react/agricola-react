import styled from '@emotion/styled';

type Props = {
  backNumber?: number;
};

/**
 *  1번 빨강, 2번 초록, 3번 민트, 4번 보라, userNumber 없으면 회색
 */
export const BackNumber = ({ backNumber }: Props) => {
  const positionX =
    backNumber === 1
      ? 0
      : backNumber === 2
        ? 20
        : backNumber === 3
          ? 40
          : backNumber === 4
            ? 60
            : backNumber === 5
              ? 80
              : 100;

  if (!backNumber) return null;

  return <Container positionX={positionX} />;
};

const Container = styled.div<{ positionX: number }>`
  background-image: url('/back_numbers.webp');
  background-repeat: no-repeat;
  background-position-x: ${props => props.positionX}%;
  background-size: 600% 100%;
  width: 100%;
  height: 140px;
  position: absolute;
  z-index: 1;
`;
