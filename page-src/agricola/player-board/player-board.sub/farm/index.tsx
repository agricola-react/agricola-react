import {
  Player,
  PlayerAction,
  currentActionState,
  playersState,
  tempSelectedFenceIndexState,
} from '@/shared/recoil';
import { Barn } from '@/shared/resource/barn';
import styled from '@emotion/styled';
import { useCurrentPlayer } from 'page-src/agricola/shared/hooks/use-current-player';

import { useRecoilState, useRecoilValue } from 'recoil';

type Props = {
  width: number;
  height: number;
  index: number;
  playerNumber: number;
};

export function Farm({ width, height, index, playerNumber }: Props) {
  const players = useRecoilValue(playersState);
  const { currentPlayer } = useCurrentPlayer();
  const [action, setAction] = useRecoilState(currentActionState);
  const [tempSelectedFenceIndex, setTempSelectedFenceIndexState] = useRecoilState(
    tempSelectedFenceIndexState
  );

  const owner = players.find(_player => _player.number === playerNumber) as Player;
  const slotValue = owner.slots[index];

  const handleAction = (actionType: PlayerAction) => {
    switch (actionType) {
      case '울타리 설치':
        setTempSelectedFenceIndexState(prev => [...prev, index]);
        break;

      case '가축 추가':
        alert(`가축 추가`);
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
      color={owner.color}
      isFence={slotValue.fenceId !== undefined}
      onClick={handleClick}
      style={{
        borderTopWidth: slotValue.emptyFenceDirections?.includes(0) ? 0 : `6px`,
        borderBottomWidth: slotValue.emptyFenceDirections?.includes(1) ? 0 : `6px`,
        borderLeftWidth: slotValue.emptyFenceDirections?.includes(2) ? 0 : `6px`,
        borderRightWidth: slotValue.emptyFenceDirections?.includes(3) ? 0 : `6px`,
      }}
      isSelected={tempSelectedFenceIndex.includes(index)}
    >
      {/* //* 외양간 영역 */}
      {slotValue.resource === '외양간' && <Barn width={28} height={35} userNumber={playerNumber} />}
      {/* //* 가축 영역 */}
      <div></div>
    </Container>
  );
}

const Container = styled.div<{
  width: number;
  height: number;
  color: string;
  isFence?: boolean;
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

  display: flex;
  flex-direction: column;
  align-items: center;

  border: ${props => (props.isFence ? `6px solid ${props.color}` : `0px`)};
`;
