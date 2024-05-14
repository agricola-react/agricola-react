import { SpaceHeight } from '@/shared/components/space-height';
import { PlayerAction, currentActionState, roundState } from '@/shared/recoil';
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
import { ActionContainer } from 'page-src/agricola/central-board/central-board.sub/action-board/shared/components/action-container';
import { useCurrentPlayer } from 'page-src/agricola/shared/hooks/use-current-player';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

const ACTION_TITLE: PlayerAction = '농장 확장';

// TODO: 확장 방 수 (사용자 입력으로 처리해야 함)
const COUNT = 1;

export const 농장확장 = () => {
  const { currentPlayer } = useCurrentPlayer();
  const [selectedPlayerNumber, setSelectedPlayerNumber] = useState<undefined | number>();
  const [action, setAction] = useRecoilState(currentActionState);
  const round = useRecoilValue(roundState);

  const handleClick = useCallback(() => {
    if (action !== null) {
      alert(`[${currentPlayer.name}] 님의 액션을 완료해주세요.`);
      return;
    }

    if (selectedPlayerNumber !== undefined) return;

    const isValid =
      currentPlayer[currentPlayer.roomType] >= COUNT * 5 && currentPlayer.reed >= COUNT * 2;

    if (isValid) {
      setAction(ACTION_TITLE);
      setSelectedPlayerNumber(currentPlayer.number);
      return;
    }

    alert('자원이 부족합니다.');
  }, [action, selectedPlayerNumber, currentPlayer]);

  useEffect(() => {
    setSelectedPlayerNumber(undefined);
  }, [round]);

  return (
    <ActionContainer
      width={115}
      height={134}
      top={0}
      left={30}
      contentHeight={100}
      descriptionHeight={155}
      isActive
      title={ACTION_TITLE}
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
