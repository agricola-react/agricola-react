import styled from '@emotion/styled';
import { Field } from './player-board.sub/field';
import { EmptySlot } from './player-board.sub/empty-slot';
import { Room } from './player-board.sub/room';

export const PlayerBoard = () => {
  return (
    <Container>
      <Room width={110} height={110} roomType="stone" />
      <EmptySlot width={110} height={110} />
      <Field width={110} height={110} />
    </Container>
  );
};

const Container = styled.div`
  width: 660px;
`;
