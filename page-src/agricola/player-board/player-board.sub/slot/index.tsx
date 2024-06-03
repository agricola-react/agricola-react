import { EmptySlot } from '../empty-slot';
import { Field } from '../field';
import { Room } from '../room';
import styled from '@emotion/styled';
import { MeepleCattle } from '@/shared/resource/meeple-cattle';
import { MeeplePig } from '@/shared/resource/meeple-pig';
import { MeepleSheep } from '@/shared/resource/meeple-sheep';
import { Farmer } from '@/shared/resource/farmer';
import { Grain } from '@/shared/resource/grain';
import { Vegetable } from '@/shared/resource/vegetable';
import { useRecoilValue } from 'recoil';
import { Player, playersState } from '@/shared/recoil';
import { Farm } from '../farm';

export type SlotType = '방' | '밭' | '울타리' | null;
export type Crops = '곡식' | '채소';
export type LiveStock = '양' | '소' | '돼지';
export type ResourceType = '사람' | Crops | LiveStock | null;

type Props = {
  type: SlotType;
  resourceType: ResourceType; // 자원 종류
  count: number; // 자원 수
  index: number; // 슬롯 위치
  playerNumber: number;
};

// resourceType과 count 정보를 통해, 슬롯 내부 자원은 Slot 컴포넌트에서 그린다.
export const Slot = ({ type, resourceType, count, index, playerNumber }: Props) => {
  const players = useRecoilValue(playersState);
  const owner = players.find(_player => _player.number === playerNumber) as Player;
  const slotInfo = owner.slots[index];

  const ResourceComponent =
    resourceType === '소'
      ? MeepleCattle
      : resourceType === '양'
        ? MeepleSheep
        : resourceType === '돼지'
          ? MeeplePig
          : resourceType === '곡식'
            ? Grain
            : resourceType === '채소'
              ? Vegetable
              : Empty;

  //? 슬롯 내부 자원 UI
  const ResourceContainer = () => {
    switch (resourceType) {
      case '소':
      case '양':
      case '돼지':
        return (
          <>
            {count > 0 && (
              <Row>
                {new Array(count).fill(0).map((_, index) => (
                  <ResourceComponent key={index} width={30} height={30} />
                ))}
              </Row>
            )}
          </>
        );
      case '사람':
        return (
          <>
            <Row>
              <Farmer key={index} width={36} height={45} userNumber={playerNumber} />
            </Row>
          </>
        );
      case '곡식':
      case '채소':
        return (
          <>
            <Row>
              {new Array(count).fill(0).map((_, index) => (
                <ResourceComponent key={index} width={30} height={40} />
              ))}
              {/* <p style={{ marginLeft: '5px', color: 'white' }}>X {count}</p> */}
            </Row>
          </>
        );
      //* 외양간은 울타리 컴포넌트 안에서 그리는 걸로 .. (겹침)
      //   case '외양간':
      default:
        break;
    }
  };

  //* 빈 땅인 경우
  if (type === null) {
    if (slotInfo.barn !== undefined)
      return <Farm width={110} height={110} index={index} playerNumber={playerNumber} />;
    return (
      <EmptySlot width={110} height={110} index={index} playerNumber={playerNumber}>
        <ResourceContainer />
      </EmptySlot>
    );
  }

  switch (type) {
    case '방':
      return (
        <Room width={110} height={110} roomType={owner.roomType} index={index}>
          <ResourceContainer />
        </Room>
      );

    case '밭':
      return (
        <Field width={110} height={110} index={index} playerNumber={playerNumber}>
          <ResourceContainer />
        </Field>
      );

    case '울타리':
      return <Farm width={110} height={110} index={index} playerNumber={playerNumber} />;
    default:
      return <></>;
  }
};

const Row = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Empty = styled.div<{ width: number; height: number }>`
  background-color: transparent;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`;
