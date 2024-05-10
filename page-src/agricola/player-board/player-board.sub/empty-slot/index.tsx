import { Player, currentActionState, playersState } from '@/shared/recoil';
import styled from '@emotion/styled';
import { produce } from 'immer';
import { useCurrentPlayer } from 'page-src/agricola/shared/hooks/use-current-player';
import {
  COL,
  ROW,
  getTwoDimensionBoard,
} from 'page-src/agricola/shared/utils/get-two-dimension-board';
import { ReactNode, useCallback } from 'react';
import { useRecoilState } from 'recoil';

// TODO: 확장 수 플레이어 지정으로 변경
const COUNT = 1;

type Props = {
  width: number;
  height: number;
  index: number;
  playerNumber: number;
  children?: ReactNode;
};

const d = [
  { dr: -1, dc: 0 },
  { dr: 1, dc: 0 },
  { dr: 0, dc: -1 },
  { dr: 0, dc: 1 },
];

export const EmptySlot = ({ width, height, index, playerNumber, children }: Props) => {
  const [players, setPlayers] = useRecoilState(playersState);
  const [action, setAction] = useRecoilState(currentActionState);

  const { currentPlayer, nextPlayer } = useCurrentPlayer();

  const owner = players.find(_player => _player.number === playerNumber) as Player;
  const ownerIndex = players.findIndex(_player => _player.number === playerNumber);

  const validate = useCallback(
    (action: '농장 확장') => {
      const board = getTwoDimensionBoard(owner.slots);
      const slotRow = Math.floor(index / COL);
      const slotCol = index % COL;

      switch (action) {
        case '농장 확장':
          return d.some(({ dr, dc }) => {
            const row = slotRow + dr;
            const col = slotCol + dc;
            if (row >= 0 && row < ROW && col >= 0 && col < COL && board[row][col].type === '방') {
              return true;
            }
            return false;
          });

        default:
          return false;
      }
    },
    [owner]
  );

  const handleClick = useCallback(() => {
    if (currentPlayer.number !== playerNumber) {
      alert(`'${currentPlayer.name}'님의 차례입니다.`);
      return;
    }

    switch (action) {
      case '농장 확장':
        if (validate(action)) {
          setPlayers(
            produce(_players => {
              _players[ownerIndex].reed -= COUNT * 2;
              _players[ownerIndex][_players[ownerIndex].roomType] -= COUNT * 5;
              _players[ownerIndex].slots = owner.slots.map((value, idx) => {
                if (idx === index) return { type: '방', resource: null, count: 0 };
                return value;
              });
            })
          );
          setAction(null);
          nextPlayer();
          return;
        }
        alert('[농장 확장] 새로운 농장은 기존 농장과 인접한 곳에만 설치할 수 있습니다.');
        break;
      case '방 확장':
        alert(`${index}번 슬롯: 방 확장 클릭`);
        break;
      case '밭 일구기':
        alert(`${index}번 슬롯: 밭 일구기 클릭`);
        break;
      default:
        alert(`액션 칸을 선택해주세요.`);
        break;
    }
  }, [action, currentPlayer]);

  return (
    <Container width={width} height={height} onClick={handleClick} color={owner.color}>
      {children}
    </Container>
  );
};

const Container = styled.div<{ width: number; height: number; color: string }>`
  background-image: url('/empty_slot.png');
  background-repeat: no-repeat;
  background-size: 100%;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.color};
  }
`;
