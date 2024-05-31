/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-case-declarations */
import { DIRECTION } from '@/shared/constants/direction';
import {
  FenceType,
  Player,
  PlayerAction,
  currentActionState,
  playersState,
  tempSelectedFenceIndexState,
} from '@/shared/recoil';
import { Barn } from '@/shared/resource/barn';
import { MeepleCattle } from '@/shared/resource/meeple-cattle';
import { MeeplePig } from '@/shared/resource/meeple-pig';
import { MeepleSheep } from '@/shared/resource/meeple-sheep';
import styled from '@emotion/styled';
import { produce } from 'immer';
import { useCurrentPlayer } from 'page-src/agricola/shared/hooks/use-current-player';
import { 가축추가action } from 'page-src/agricola/shared/utils/do-action/가축추가action';

import { useRecoilState, useRecoilValue } from 'recoil';

type Props = {
  width: number;
  height: number;
  index: number;
  playerNumber: number;
};

export function Farm({ width, height, index, playerNumber }: Props) {
  const players = useRecoilValue(playersState);
  const { currentPlayer, setPlayers } = useCurrentPlayer();
  const action = useRecoilValue(currentActionState);
  const [tempSelectedFenceIndex, setTempSelectedFenceIndexState] = useRecoilState(
    tempSelectedFenceIndexState
  );

  const owner = players.find(_player => _player.number === playerNumber) as Player;
  const slotValue = owner.slots[index];
  const fenceInfo = owner.ownedFence.find(
    fence => fence.id === owner.slots[index].fenceId
  ) as FenceType;

  const Animal =
    fenceInfo?.animalType === '양' || slotValue.resource === '양'
      ? () => MeepleSheep({ width: 28, height: 22 })
      : fenceInfo?.animalType === '돼지' || slotValue.resource === '돼지'
        ? () => MeeplePig({ width: 32, height: 22 })
        : fenceInfo?.animalType === '소' || slotValue.resource === '소'
          ? () => MeepleCattle({ width: 31, height: 23 })
          : null;

  const handleAction = (actionType: PlayerAction) => {
    switch (actionType) {
      case '울타리 설치':
        setTempSelectedFenceIndexState(prev => [...prev, index]);
        break;

      case '가축 추가':
        const stockInfo = action?.stockInfo;
        if (stockInfo === undefined) {
          console.error(`[가축 추가] 가축 정보가 없습니다.`);
          break;
        }

        const fenceId = owner.slots[index].fenceId;
        const updatedPlayer = 가축추가action(owner, index, stockInfo, fenceId);

        if (updatedPlayer !== null) {
          setPlayers(
            produce(_players => {
              _players[playerNumber - 1] = updatedPlayer;
            })
          );
        }

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
        borderTopWidth: slotValue.emptyFenceDirections?.includes(DIRECTION.상) ? 0 : `8px`,
        borderBottomWidth: slotValue.emptyFenceDirections?.includes(DIRECTION.하) ? 0 : `8px`,
        borderLeftWidth: slotValue.emptyFenceDirections?.includes(DIRECTION.좌) ? 0 : `8px`,
        borderRightWidth: slotValue.emptyFenceDirections?.includes(DIRECTION.우) ? 0 : `8px`,
      }}
      isSelected={tempSelectedFenceIndex.includes(index)}
    >
      {/* //* 외양간 영역 */}
      <div>
        {slotValue.barn !== undefined && <Barn width={28} height={35} userNumber={playerNumber} />}
      </div>
      {/* //* 가축 영역 */}
      <LivestockContainer>
        {Animal !== null &&
          new Array(slotValue.count).fill(0).map((_, index) => <Animal key={index} />)}
      </LivestockContainer>
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

  & > * {
    flex: 1;
  }

  &:hover {
    background-color: ${props => props.color};
  }
  background-color: ${props => (props.isSelected ? props.color : 'transparent')};

  display: flex;
  flex-direction: column;
  align-items: center;

  border: ${props => (props.isFence ? `8px solid ${props.color}` : `0px`)};
`;

const LivestockContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
`;
