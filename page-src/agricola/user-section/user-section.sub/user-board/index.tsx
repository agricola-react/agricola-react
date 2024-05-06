import { SpaceHeight } from '@/shared/components/space-height';
import { Barn } from '@/shared/resource/barn';
import { Clay } from '@/shared/resource/clay';
import { Farmer } from '@/shared/resource/farmer';
import { Grain } from '@/shared/resource/grain';
import { MeepleCattle } from '@/shared/resource/meeple-cattle';
import { MeepleFence } from '@/shared/resource/meeple-fence';
import { MeepleFirst } from '@/shared/resource/meeple-first';
import { MeepleFood } from '@/shared/resource/meeple-food';
import { MeeplePig } from '@/shared/resource/meeple-pig';
import { MeepleSheep } from '@/shared/resource/meeple-sheep';
import { Reed } from '@/shared/resource/reed';
import { Stone } from '@/shared/resource/stone';
import { Vegetable } from '@/shared/resource/vegetable';
import { Wood } from '@/shared/resource/wood';
import styled from '@emotion/styled';

export const UserBoard = () => {
  const resourceList = [
    {
      Component: <Wood width={15} height={20} />,
      count: 1,
    },
    {
      Component: <Clay width={15} height={20} />,
      count: 1,
    },
    {
      Component: <Stone width={15} height={20} />,
      count: 1,
    },
    {
      Component: <Reed width={15} height={20} />,
      count: 1,
    },
    {
      Component: <Grain width={15} height={20} />,
      count: 1,
    },
    {
      Component: <Vegetable width={15} height={20} />,
      count: 1,
    },
    {
      Component: <MeepleFood width={15} height={20} />,
      count: 1,
    },
  ];

  const livestocks = [
    {
      Component: <MeepleSheep width={20} height={20} />,
      count: 1,
    },
    {
      Component: <MeeplePig width={20} height={20} />,
      count: 1,
    },
    {
      Component: <MeepleCattle width={20} height={20} />,
      count: 1,
    },
  ];

  const EtcRecourseList = [
    {
      Component: <Farmer width={15} height={20} userNumber={1} />,
      count: 1,
    },
    {
      Component: <MeepleFence width={15} height={20} userNumber={1} />,
      count: 1,
    },
    {
      Component: <Barn width={15} height={20} userNumber={1} />,
      count: 1,
    },
  ];

  return (
    <Container>
      <div className="flex justify-between">
        <div className="flex items-center gap-[15px]">
          <div>아이콘</div>
          <div>
            <div>Player 1</div>
            <div>14점</div>
          </div>
        </div>
        <MeepleFirst width={20} height={40} />
      </div>
      <SpaceHeight height={20} />
      <div className="flex gap-[20px]">
        {resourceList.map(({ Component, count }, index) => {
          return (
            <div className="flex items-center gap-[10px]" key={index}>
              <div className="font-bold">{count}</div>
              <div>{Component}</div>
            </div>
          );
        })}
      </div>
      <hr className="border-1 border-solid border-[#80502e] my-[10px]" />
      <div className="flex justify-center gap-[20px]">
        {livestocks.map(({ Component, count }, index) => {
          return (
            <div className="flex items-center gap-[10px]" key={index}>
              <div className="font-bold">{count}</div>
              <div>{Component}</div>
            </div>
          );
        })}
      </div>
      <hr className="border-1 border-solid border-[#80502e] my-[10px]" />
      <div className="flex justify-center gap-[20px]">
        {EtcRecourseList.map(({ Component, count }, index) => {
          return (
            <div className="flex items-center gap-[10px]" key={index}>
              <div className="font-bold">{count}</div>
              <div>{Component}</div>
            </div>
          );
        })}
      </div>
    </Container>
  );
};

const Container = styled.div`
  background-color: transparent !important;
  background-image: url('https://x.boardgamearena.net/data/themereleases/current/games/agricola/220107-0030/img/action_frame_bg.jpg');
  background-size: 100% 10px;
  border: 1px solid transparent;
  border-image-outset: 0 0 0 0;
  border-image-repeat: stretch stretch;
  border-image-slice: 27 27 27 27;
  border-image-source: url('https://x.boardgamearena.net/data/themereleases/current/games/agricola/220107-0030/img/action_frame_panel.png');
  border-image-width: 12px 12px 12px 12px;
  border-radius: 20px !important;
  box-shadow: -1px 2px 5px #000;
  padding: 20px;
  height: 250px;
`;
