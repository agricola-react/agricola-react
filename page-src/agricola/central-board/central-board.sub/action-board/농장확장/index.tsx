import { SpaceHeight } from '@/shared/components/space-height';
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

export const 농장확장 = () => {
  return (
    <ActionContainer
      width={115}
      height={134}
      top={0}
      left={30}
      contentHeight={100}
      descriptionHeight={155}
      isActive
      title="농장확장"
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
