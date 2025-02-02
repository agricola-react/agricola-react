import {
  Player,
  PlayerAction,
  currentActionState,
  playersState,
  tempSelectedFenceIndexState,
} from '@/shared/recoil';
import styled from '@emotion/styled';
import { produce } from 'immer';
import { useCurrentPlayer } from 'page-src/agricola/shared/hooks/use-current-player';
import { 농장확장action } from 'page-src/agricola/shared/utils/do-action/농장확장action';
import { 농지설치action } from 'page-src/agricola/shared/utils/do-action/농지설치action';
import { 외양간설치action } from 'page-src/agricola/shared/utils/do-action/외양간설치action';
import { ReactNode } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

// TODO: 확장 수 플레이어 지정으로 변경

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
  const [tempSelectedFenceIndex, setTempSelectedFenceIndexState] = useRecoilState(
    tempSelectedFenceIndexState
  );

  const { currentPlayer, setPlayers } = useCurrentPlayer();

  const owner = players.find(_player => _player.number === playerNumber) as Player;
  const ownerIndex = players.findIndex(_player => _player.number === playerNumber);

  const handleAction = (action: PlayerAction) => {
    switch (action) {
      case '농장 확장':
        // eslint-disable-next-line no-case-declarations
        const updatedPlayer = 농장확장action(owner, index);

        if (updatedPlayer !== null) {
          setPlayers(
            produce(_players => {
              _players[ownerIndex] = updatedPlayer;
            })
          );
          setAction({
            type: '농장 확장',
            isDone: true,
          });
        }
        break;

      case '농지':
        // eslint-disable-next-line no-case-declarations
        const updatedPlayer2 = 농지설치action(owner, index);

        if (updatedPlayer2 !== null) {
          setPlayers(
            produce(_players => {
              _players[ownerIndex] = updatedPlayer2;
            })
          );
          setAction({
            type: '농지',
            isDone: true,
          });
        }
        break;

      case '외양간 설치':
        // eslint-disable-next-line no-case-declarations
        const updatedPlayer3 = 외양간설치action(owner, index);

        if (updatedPlayer3 !== null) {
          setPlayers(
            produce(_players => {
              _players[playerNumber - 1] = updatedPlayer3;
            })
          );

          setAction({
            type: '외양간 설치',
            isDone: true,
          });
        }
        break;
      case '울타리 설치':
        setTempSelectedFenceIndexState(prev => [...prev, index]);
        break;
      default:
        break;
    }
  };

  const handleClick = () => {
    if (currentPlayer.number !== playerNumber) {
      alert(`'${currentPlayer.name}'님의 차례입니다.`);
      return;
    }

    if (action === null) {
      alert(`액션을 선택해주세요.`);
      return;
    }

    if (!action.isDone) {
      handleAction(action.type);
      return;
    }
  };

  return (
    <Container
      width={width}
      height={height}
      onClick={handleClick}
      color={owner.color}
      isSelected={tempSelectedFenceIndex.includes(index) && playerNumber === currentPlayer.number}
    >
      {children}
      <div>{owner.slots[index].emptyFenceDirections}</div>
    </Container>
  );
};

const Container = styled.div<{
  width: number;
  height: number;
  color: string;
  isSelected?: boolean;
}>`
  background-image: url('/empty_slot.png');
  background-repeat: no-repeat;
  background-size: 100%;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.color};
  }
  background-color: ${props => (props.isSelected ? props.color : 'transparent')};
`;
