import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
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

function getUpdatedFarmerBoard(
  playerBoard: BoardValue[],
  type: 'reduce' | 'fill' | 'increase'
): BoardValue[] {
  switch (type) {
    case 'fill':
      return playerBoard.map(slot => {
        if (slot.type === '방')
          return {
            ...slot,
            resource: '사람',
            count: slot.count + 1,
          };
        return slot;
      });
    case 'increase':
      playerBoard.some((slot, index) => {
        if (slot.type === '방' && slot.resource === null) {
          playerBoard[index] = {
            ...slot,
            resource: '사람',
            count: slot.count + 1,
          };
          return true;
        }
      });
      return [...playerBoard];
    case 'reduce':
      playerBoard.some((slot, index) => {
        if (slot.type === '방' && slot.resource === '사람') {
          playerBoard[index] = {
            ...slot,
            resource: null,
            count: slot.count,
          };
          return true;
        }
      });
      return [...playerBoard];
    default:
      return [...playerBoard];
  }
}

// TODO: useContext
export const PlayerBoard = ({ playerNumber }: Props) => {
  const [playerBoard, setPlayerBoard] = useState<BoardValue[]>(initBoard);
  const players = useRecoilValue(playersState);
  const owner = players.find(player => player.number === playerNumber);

  useEffect(() => {
    if (owner === undefined) return;

    const boardFarmers = playerBoard.reduce((sum, cur) => {
      if (cur.type === '방' && cur.resource === '사람') return sum + 1;
      return sum;
    }, 0);

    // homeFarmer 값이 감소한 경우 -> homeFarmer를 방에서 없앤다
    if (owner.homeFarmer < boardFarmers) {
      setPlayerBoard(getUpdatedFarmerBoard(playerBoard, 'reduce'));
      return;
    }
    // 모두 복귀 -> homeFarmer를 모든 방에 넣는다
    if (owner.homeFarmer === owner.farmer) {
      setPlayerBoard(getUpdatedFarmerBoard(playerBoard, 'fill'));
      return;
    }
    // homeFarmer 값이 증가한 경우 -> homeFarmer를 방에 추가
    if (owner.homeFarmer > boardFarmers) {
      setPlayerBoard(getUpdatedFarmerBoard(playerBoard, 'increase'));
      return;
    }
  }, [owner?.homeFarmer, owner?.farmer]);

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
