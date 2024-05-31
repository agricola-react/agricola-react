import { INIT_GRAIN, INIT_VEGETABLE } from '@/shared/constants/field';
import { Player, currentActionState, playersState } from '@/shared/recoil';
import { Grain } from '@/shared/resource/grain';
import { Vegetable } from '@/shared/resource/vegetable';
import styled from '@emotion/styled';
import { produce } from 'immer';
import { useCurrentPlayer } from 'page-src/agricola/shared/hooks/use-current-player';
import { isEmptyField } from 'page-src/agricola/shared/utils/is-empty-field';
import { ReactNode } from 'react';
import { useRecoilValue } from 'recoil';

type Props = {
  width: number;
  height: number;
  index: number;
  playerNumber: number;
  children?: ReactNode;
};

export const Field = ({ width, height, index, playerNumber, children }: Props) => {
  const players = useRecoilValue(playersState);
  const action = useRecoilValue(currentActionState);

  const { currentPlayer, setPlayers } = useCurrentPlayer();

  const owner = players.find(_player => _player.number === playerNumber) as Player;
  const ownerIndex = players.findIndex(_player => _player.number === playerNumber);

  const handleSeedClick = (type: 'grain' | 'vegetable') => {
    switch (type) {
      case 'grain':
        if (owner.grain === 0) {
          alert(`곡식이 부족합니다.`);
          break;
        }

        if (isEmptyField(owner.slots, index)) {
          setPlayers(
            produce(_players => {
              _players[ownerIndex].grain -= 1;
              _players[ownerIndex].slots = owner.slots.map((slot, idx) => {
                if (idx === index) return INIT_GRAIN;
                return slot;
              });
            })
          );
          break;
        }
        alert('해당 위치에는 이미 다른 자원이 존재하므로, 씨를 뿌릴 수 없습니다.');
        break;
      case 'vegetable':
        if (owner.vegetable === 0) {
          alert(`채소가 부족합니다.`);
          break;
        }

        if (isEmptyField(owner.slots, index)) {
          setPlayers(
            produce(_players => {
              _players[ownerIndex].vegetable -= 1;
              _players[ownerIndex].slots = owner.slots.map((slot, idx) => {
                if (idx === index) return INIT_VEGETABLE;
                return slot;
              });
            })
          );
          break;
        }
        alert('해당 위치에는 이미 다른 자원이 존재하므로, 씨를 뿌릴 수 없습니다.');
        break;
      default:
        break;
    }
  };

  const isActive =
    action?.type === '씨뿌리기' && !action.isDone && currentPlayer.number === playerNumber;

  const handleClick = (type: 'grain' | 'vegetable') => {
    if (currentPlayer.number !== playerNumber) {
      alert(`'${currentPlayer.name}'님의 차례입니다.`);
      return;
    }

    if (action === null) {
      alert(`액션을 선택해주세요.`);
      return;
    }

    if (!action.isDone) {
      handleSeedClick(type);
      return;
    }
  };

  return (
    <Container width={width} height={height}>
      {isActive && (
        <SelectorContainer>
          <SelectorButton onClick={() => handleClick('grain')}>
            <Grain width={30} height={30} />
          </SelectorButton>
          <SelectorButton onClick={() => handleClick('vegetable')}>
            <Vegetable width={30} height={30} />
          </SelectorButton>
        </SelectorContainer>
      )}
      {children}
    </Container>
  );
};

const Container = styled.div<{ width: number; height: number }>`
  position: relative;

  background-image: url('/field.webp');
  background-repeat: no-repeat;
  background-size: 100%;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  cursor: pointer;
`;

const SelectorContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;

  display: flex;
  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
  &:hover button {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const SelectorButton = styled.button`
  display: none;
  flex: 1;
`;
