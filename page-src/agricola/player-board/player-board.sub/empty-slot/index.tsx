import { 현재턴State } from '@/shared/recoil/현재턴/atoms';
import styled from '@emotion/styled';
import { ReactNode, useCallback } from 'react';
import { useRecoilValue } from 'recoil';

type Props = {
  width: number;
  height: number;
  index: number;
  children?: ReactNode;
};

export const EmptySlot = ({ width, height, index, children }: Props) => {
  const turnInfo = useRecoilValue(현재턴State);
  const handleClick = useCallback(() => {
    switch (turnInfo.action) {
      case '방 확장':
        alert(`${index}번 슬롯: 방 확장 클릭`);
        break;
      case '밭 일구기':
        alert(`${index}번 슬롯: 밭 일구기 클릭`);
        break;
    }
  }, [turnInfo]);
  return (
    <Container width={width} height={height} onClick={handleClick}>
      {children}
    </Container>
  );
};

const Container = styled.div<{ width: number; height: number }>`
  background-image: url('/empty_slot.png');
  background-repeat: no-repeat;
  background-size: 100%;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  cursor: pointer;
`;
