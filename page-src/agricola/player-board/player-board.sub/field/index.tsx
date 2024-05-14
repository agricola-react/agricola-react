import { Player, currentActionState, playersState } from '@/shared/recoil';
import { Grain } from '@/shared/resource/grain';
import { Vegetable } from '@/shared/resource/vegetable';
import styled from '@emotion/styled';
import { produce } from 'immer';
import { useCurrentPlayer } from 'page-src/agricola/shared/hooks/use-current-player';
import { ReactNode } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

type Props = {
  width: number;
  height: number;
  index: number;
  playerNumber: number;
  children?: ReactNode;
};

export const Field = ({ width, height, index, playerNumber, children }: Props) => {
  const players = useRecoilValue(playersState);
  const [action, setAction] = useRecoilState(currentActionState);

  const { currentPlayer, nextPlayer, setPlayers } = useCurrentPlayer();

  const owner = players.find(_player => _player.number === playerNumber) as Player;
  const ownerIndex = players.findIndex(_player => _player.number === playerNumber);

  const handleSeedClick = (type: 'grain' | 'vegetable') => {
    switch (type) {
      case 'grain':
        if (
          owner.grain > 0 &&
          owner.slots[index].resource === null &&
          owner.slots[index].count === 0
        ) {
          setPlayers(
            produce(_players => {
              _players[ownerIndex].homeFarmer -= 1;
              _players[ownerIndex].grain -= 1;
              _players[ownerIndex].slots = owner.slots.map((slot, idx) => {
                if (idx === index) return { type: '밭', resource: '곡식', count: 1 };
                return slot;
              });
            })
          );
          setAction(null);
          nextPlayer();
          break;
        }
        alert('곡식을 뿌릴 수 있는 땅이 존재하지 않습니다.');
        break;
      case 'vegetable':
        alert('채소 클릭');
        break;
      default:
        break;
    }
  };

  const isActive = action === '씨뿌리기' && currentPlayer.number === playerNumber;

  return (
    <Container width={width} height={height}>
      {isActive && (
        <SelectorContainer>
          <SelectorButton onClick={() => handleSeedClick('grain')}>
            <Grain width={30} height={30} />
          </SelectorButton>
          <SelectorButton onClick={() => handleSeedClick('vegetable')}>
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
