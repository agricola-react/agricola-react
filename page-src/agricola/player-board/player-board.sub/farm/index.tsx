import { Player, PlayerAction, currentActionState, playersState } from '@/shared/recoil';
import { Barn } from '@/shared/resource/barn';
import styled from '@emotion/styled';
import { useCurrentPlayer } from 'page-src/agricola/shared/hooks/use-current-player';
import { useCallback } from 'react';
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

  const owner = players.find(_player => _player.number === playerNumber) as Player;
  const slotValue = owner.slots[index];

  const handleAction = useCallback((actionType: PlayerAction) => {
    switch (actionType) {
      case '울타리 설치':
        alert(`울타리 설치하기`);
        break;

      default:
        break;
    }
  }, []);

  const handleClick = useCallback(() => {
    alert(`Farm 슬롯 클릭`);

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
  }, [action, currentPlayer]);

  return (
    <Container width={width} height={height} onClick={handleClick}>
      {/* //* 외양간 영역 */}
      {slotValue.resource === '외양간' && <Barn width={28} height={35} userNumber={playerNumber} />}
      {/* //* 가축 영역 */}
      <div></div>
    </Container>
  );
}

const Container = styled.div<{ width: number; height: number }>`
  background-image: url('/empty_slot.png');
  background-repeat: no-repeat;
  background-size: 100%;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  cursor: pointer;

  display: flex;
  flex-direction: column;
  align-items: center;
`;
