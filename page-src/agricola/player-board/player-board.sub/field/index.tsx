import { currentActionState } from '@/shared/recoil';
import styled from '@emotion/styled';
import { ReactNode, useCallback } from 'react';
import { useRecoilValue } from 'recoil';

type Props = {
  width: number;
  height: number;
  index: number;
  children?: ReactNode;
};

export const Field = ({ width, height, index, children }: Props) => {
  const actionState = useRecoilValue(currentActionState);
  const handleClick = useCallback(() => {
    switch (actionState) {
      case '씨 뿌리기':
        alert(`${index}번 슬롯: 씨 뿌리기 클릭`);
        break;
      default:
        alert(`${index}번 슬롯 클릭`);
        break;
    }
  }, [actionState]);

  return (
    <Container width={width} height={height} onClick={handleClick}>
      {children}
    </Container>
  );
};

const Container = styled.div<{ width: number; height: number }>`
  background-image: url('/field.webp');
  background-repeat: no-repeat;
  background-size: 100%;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  cursor: pointer;
`;
