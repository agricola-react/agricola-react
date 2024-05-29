import { SpaceHeight } from '@/shared/components/space-height';
import {
  PlayerAction,
  currentActionState,
  currentRoundNameState,
  roundState,
} from '@/shared/recoil';
import { Arrow } from '@/shared/resource/arrow';
import { Barn } from '@/shared/resource/barn';
import { Clay } from '@/shared/resource/clay';
import { Reed } from '@/shared/resource/reed';
import { RoomClay } from '@/shared/resource/room-clay';
import { RoomStone } from '@/shared/resource/room-stone';
import { RoomWood } from '@/shared/resource/room-wood';
import { Stone } from '@/shared/resource/stone';
import { Wood } from '@/shared/resource/wood';
import styled from '@emotion/styled';
import { produce } from 'immer';
import { ActionContainer } from 'page-src/agricola/central-board/central-board.sub/action-board/shared/components/action-container';
import { useCurrentPlayer } from 'page-src/agricola/shared/hooks/use-current-player';
import { can농장확장 } from 'page-src/agricola/shared/utils/validate-action/can농장확장';
import { can외양간설치 } from 'page-src/agricola/shared/utils/validate-action/can외양간설치';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

const ROUND_NAME = '농장 확장';
const FIRST_ACTION: PlayerAction = '농장 확장';
const SECOND_ACTION: PlayerAction = '외양간 설치';

// TODO: 확장 방 수 (사용자 입력으로 처리해야 함)
const COUNT = 1;

export const 농장확장 = () => {
  const { currentPlayer } = useCurrentPlayer();
  const [selectedPlayerNumber, setSelectedPlayerNumber] = useState<undefined | number>();
  const [action, setAction] = useRecoilState(currentActionState);
  const round = useRecoilValue(roundState);
  const [currentRoundName, setCurrentRoundName] = useRecoilState(currentRoundNameState);
  const { setPlayers, nextPlayer } = useCurrentPlayer();

  const handleClick = useCallback(() => {
    if (action !== null) {
      alert(`[${currentPlayer.name}] 님의 액션을 완료해주세요.`);
      return;
    }

    if (selectedPlayerNumber !== undefined) return;

    setCurrentRoundName(ROUND_NAME);

    if (can농장확장(currentPlayer, COUNT)) {
      const 농장확장확정 = confirm(`[방 확장] 방을 확장하시겠습니까?`);

      if (농장확장확정) {
        setAction({ type: FIRST_ACTION, isDone: false });
        setSelectedPlayerNumber(currentPlayer.number);
        return;
      }
    }

    if (can외양간설치(currentPlayer)) {
      alert(`[농장확장] 외양간 설치를 진행합니다.`);
      setAction({ type: SECOND_ACTION, isDone: false });
      setSelectedPlayerNumber(currentPlayer.number);
      return;
    }

    alert('자원이 부족합니다.');
  }, [action, selectedPlayerNumber, currentPlayer]);

  useEffect(() => {
    setSelectedPlayerNumber(undefined);
  }, [round]);

  useEffect(() => {
    let isDone = action?.type === SECOND_ACTION && action.isDone && currentRoundName === ROUND_NAME;

    if (action?.type === FIRST_ACTION && action.isDone && currentRoundName === ROUND_NAME) {
      // 여기에 외양간 로직
      const 외양간설치할지 = confirm('외양간을 설치하시겠습니까?');

      if (외양간설치할지) {
        setAction({ type: SECOND_ACTION, isDone: false });
        return;
      }

      isDone = true;
    }

    if (isDone) {
      setPlayers(
        produce(_players => {
          _players[currentPlayer.number - 1].homeFarmer -= 1;
        })
      );
      setAction(null);
      nextPlayer();
    }
  }, [action]);

  return (
    <ActionContainer
      width={115}
      height={134}
      top={0}
      left={30}
      contentHeight={100}
      descriptionHeight={155}
      isActive
      title={ROUND_NAME}
      onClick={handleClick}
      userNumber={selectedPlayerNumber}
    >
      <div className="flex flex-col items-center">
        <div className="flex">
          <DescriptionNumber>5</DescriptionNumber>
          <Wood width={10} height={15} />
          <DescriptionNumber>2</DescriptionNumber>
          <Reed width={10} height={15} />
          <Arrow width={13} height={13} />
          <RoomWood width={20} height={10} />
        </div>
        <SpaceHeight height={5} />
        <div className="flex">
          <DescriptionNumber>5</DescriptionNumber>
          <Clay width={10} height={15} />
          <DescriptionNumber>2</DescriptionNumber>
          <Reed width={10} height={15} />
          <Arrow width={13} height={13} />
          <RoomClay width={20} height={10} />
        </div>
        <SpaceHeight height={5} />
        <div className="flex">
          <DescriptionNumber>5</DescriptionNumber>
          <Stone width={10} height={15} />
          <DescriptionNumber>2</DescriptionNumber>
          <Reed width={10} height={15} />
          <Arrow width={13} height={13} />
          <RoomStone width={20} height={10} />
        </div>
        <Plus>+</Plus>
        <div className="flex">
          <DescriptionNumber>5</DescriptionNumber>
          <Wood width={10} height={15} />
          <Arrow width={13} height={13} />
          <Barn width={10} height={15} />
        </div>
      </div>
    </ActionContainer>
  );
};

const DescriptionNumber = styled.span`
  font-size: 10px;
  margin-right: 2px;
  margin-left: 5px;
  font-weight: bold;
`;

const Plus = styled.div`
  font-weight: bold;
  text-align: center;
`;
