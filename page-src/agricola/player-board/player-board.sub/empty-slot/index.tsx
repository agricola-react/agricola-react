import styled from '@emotion/styled';

type Props = {
  width: number;
  height: number;
};

export const EmptySlot = ({ width, height }: Props) => {
  return <Container width={width} height={height}></Container>;
};

const Container = styled.div<{ width: number; height: number }>`
  background-image: url('/empty_slot.png');
  background-repeat: no-repeat;
  background-size: 100%;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`;
