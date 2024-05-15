import { Player, PlayerAction, currentActionState, playersState } from '@/shared/recoil';
import styled from '@emotion/styled';
import { produce } from 'immer';
import { useCurrentPlayer } from 'page-src/agricola/shared/hooks/use-current-player';
import { isExistAtLeastOne, isNearPosition } from 'page-src/agricola/shared/utils/validate-slot';
import { ReactNode, useCallback } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

// TODO: 확장 수 플레이어 지정으로 변경
const COUNT = 1;

type Props = {
  width: number;
  height: number;
  index: number;
  playerNumber: number;
  children?: ReactNode;
};

export const EmptySlot = ({ width, height, index, playerNumber, children }: Props) => {
  const players = useRecoilValue(playersState);
  const [action, setAction] = useRecoilState(currentActionState);

  const { currentPlayer, nextPlayer, setPlayers } = useCurrentPlayer();

  const owner = players.find(_player => _player.number === playerNumber) as Player;
  const ownerIndex = players.findIndex(_player => _player.number === playerNumber);

  const handleAction = (action: PlayerAction) => {
    switch (action) {
      case '농장 확장':
        if (isNearPosition(owner.slots, index, '방')) {
          setPlayers(
            produce(_players => {
              _players[ownerIndex].homeFarmer -= 1;
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
          break;
        }
        alert('[농장 확장] 새로운 농장은 기존 농장과 인접한 곳에만 설치할 수 있습니다.');
        break;

      case '농지':
        if (!isExistAtLeastOne(owner.slots, '밭') || isNearPosition(owner.slots, index, '밭')) {
          setPlayers(
            produce(_players => {
              _players[ownerIndex].homeFarmer -= 1;
              _players[ownerIndex].slots = owner.slots.map((slot, idx) => {
                if (idx === index) return { type: '밭', resource: null, count: 0 };
                return slot;
              });
            })
          );
          setAction(null);
          nextPlayer();
          break;
        }
        alert('[농지] 농지가 이미 존재하는 경우, 기존 농지와 인접한 곳에만 설치할 수 있습니다.');
        break;

      default:
        break;
    }
  };

  const handleClick = useCallback(() => {
    if (currentPlayer.number !== playerNumber) {
      alert(`'${currentPlayer.name}'님의 차례입니다.`);
      return;
    }

    if (action === null) {
      alert(`액션을 선택해주세요.`);
      return;
    }

    handleAction(action);
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
