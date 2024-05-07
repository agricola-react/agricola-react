import styled from '@emotion/styled';
import { useState } from 'react';
import { ResourceType, Slot, SlotType } from './player-board.sub/slot';
import { useRecoilValue } from 'recoil';
import { playersState } from '@/shared/recoil';

type BoardValue = {
  type: SlotType;
  resource: ResourceType;
  count: number;
};

type Props = {
  playerNumber: number;
};

const initBoard: BoardValue[] = new Array(15)
  .fill({
    type: null,
    resource: null,
    count: 1,
  })
  .map((value, index) => {
    if (index === 5 || index === 10) {
      return {
        type: '방',
        resource: '사람',
        count: 1,
      };
    }
    return value;
  });

// TODO: useContext
export const PlayerBoard = ({ playerNumber }: Props) => {
  const [playerBoard, setPlayerBoard] = useState<BoardValue[]>(initBoard);
  const players = useRecoilValue(playersState);
  const owner = players.find(player => player.number === playerNumber);

  return (
    <Container>
      <Title>
        <h4>{owner?.name} 보드</h4>
      </Title>
      <Wrapper>
        {playerBoard.map((info, index) => (
          <Slot
            key={`slot${index}`}
            type={info.type}
            resourceType={info.resource}
            count={info.count}
            index={index}
            playerNumber={playerNumber}
          />
        ))}
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  border: solid 1px black;
`;

const Title = styled.div`
  display: inline-block;
  padding: 5px;
  background-color: hsla(0, 0%, 100%, 0.5);
  color: gray;
`;

const Wrapper = styled.div`
  padding: 50px 0;
  width: 660px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-items: center;
`;
