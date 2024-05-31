/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-case-declarations */
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
import { calculateFenceTotalMax } from 'page-src/agricola/shared/utils/calculate-fence-total-max';

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
  const [action, setAction] = useRecoilState(currentActionState);
  const [tempSelectedFenceIndex, setTempSelectedFenceIndexState] = useRecoilState(
    tempSelectedFenceIndexState
  );

  const owner = players.find(_player => _player.number === playerNumber) as Player;
  const slotValue = owner.slots[index];
  const fenceInfo = owner.ownedFence.find(
    fence => fence.id === owner.slots[index].fenceId
  ) as FenceType;

  const Animal =
    fenceInfo?.animalType === '양'
      ? () => MeepleSheep({ width: 28, height: 22 })
      : fenceInfo?.animalType === '돼지'
        ? () => MeeplePig({ width: 32, height: 22 })
        : fenceInfo?.animalType === '소'
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
          console.log(`[가축 추가] 가축 정보가 없습니다.`);
          return;
        }

        const { count, type } = stockInfo;
        const fenceId = owner.slots[index].fenceId;

        //* 예외처리
        //? 울타리가 존재하지 않는 경우
        if (fenceId === undefined) {
          //? 1. 외양간만 존재하는 경우
          if (owner.slots[index].barn) {
            //TODO
            break;
          }
          //? 2. 빈 땅인 경우
          alert(`[가축 추가] 가축을 데려오려면 외양간 혹은 울타리가 존재해야 합니다.`);
          break;
        }

        //? 1. fenceInfo 가져오기
        const fenceInfo = owner.ownedFence.find(fenceInfo => fenceInfo.id === fenceId) as FenceType;

        if (fenceInfo.animalType !== null && fenceInfo.animalType !== type) {
          alert(`[가축 추가] 하나의 울타리에는 동일한 가축만 키울 수 있습니다.`);
          break;
        }

        let ownedFences = [...owner.ownedFence];
        //* 검증
        //? 비어있는 울타리의 경우 가축 종류 추가
        if (fenceInfo.animalType === null) {
          ownedFences = ownedFences.map(fence => {
            if (fence.id === fenceId)
              return {
                ...fence,
                animalType: type,
              };
            return {
              ...fence,
            };
          });
        }

        const sameFenceSlots = owner.slots.filter(slot => slot.fenceId === fenceId);
        const sameFenceTotalCount = sameFenceSlots.reduce((acc, slot) => acc + slot.count, 0);
        const fenceTotalMax = calculateFenceTotalMax(owner.slots, fenceId);
        const singleFenceMax = Math.floor(fenceTotalMax / sameFenceSlots.length);

        console.log(`[fenceId] ${fenceId} / [수용 가능 최대 가축 수] ::`, fenceTotalMax);

        //? 예외처리
        if (sameFenceTotalCount === fenceTotalMax) {
          alert(`[가축 추가] 울타리가 가득 찼습니다.`);
          break;
        }

        //* 계산
        let remain = count;
        const updatedSlots = owner.slots.map(slot => {
          if (remain > 0 && slot.fenceId === fenceId) {
            if (slot.count < singleFenceMax) {
              let plus = Math.min(remain, singleFenceMax - slot.count);
              remain -= plus;
              setAction({
                type: actionType,
                isDone: false,
                stockInfo: {
                  type,
                  count: count - plus,
                },
              });
              return {
                ...slot,
                count: slot.count + plus,
              };
            }
          }
          return slot;
        });

        //* 반영
        setPlayers(
          produce(_players => {
            _players[playerNumber - 1].slots = updatedSlots;
            _players[playerNumber - 1].ownedFence = ownedFences;
          })
        );

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

  border: ${props => (props.isFence ? `6px solid ${props.color}` : `0px`)};
`;

const LivestockContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
`;
