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

export const 농장확장 = () => {
  return (
    <Container>
      <Wrapper>
        <Title>농장확장</Title>
        <SpaceHeight height={8} />
        <div>
          <DescriptionWrapper>
            <DescriptionNumber>5</DescriptionNumber>
            <Wood width={15} height={17} />
            <DescriptionNumber>2</DescriptionNumber>
            <Reed width={15} height={17} />
            <Arrow width={13} height={13} />
            <RoomWood width={20} height={10} />
          </DescriptionWrapper>
        </div>
        <SpaceHeight height={5} />
        <div>
          <DescriptionWrapper>
            <DescriptionNumber>5</DescriptionNumber>
            <Clay width={15} height={17} />
            <DescriptionNumber>2</DescriptionNumber>
            <Reed width={15} height={17} />
            <Arrow width={13} height={13} />
            <RoomClay width={20} height={10} />
          </DescriptionWrapper>
        </div>
        <SpaceHeight height={5} />
        <div>
          <DescriptionWrapper>
            <DescriptionNumber>5</DescriptionNumber>
            <Stone width={15} height={17} />
            <DescriptionNumber>2</DescriptionNumber>
            <Reed width={15} height={17} />
            <Arrow width={13} height={13} />
            <RoomStone width={20} height={10} />
          </DescriptionWrapper>
        </div>
        <Plus>+</Plus>
        <div>
          <DescriptionWrapper>
            <DescriptionNumber>5</DescriptionNumber>
            <Wood width={15} height={17} />
            <Arrow width={13} height={13} />
            <Barn width={15} height={15} />
          </DescriptionWrapper>
        </div>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  height: 144px;
  top: -10px;
  left: 30px;
  width: 115px;
  background-image: url('/action_frame.webp');
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div``;

const Title = styled.div`
  font-size: 11px;
  margin: 0px;
  margin-top: 11px;
  text-align: center;
  font-weight: bold;
`;

const DescriptionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

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
