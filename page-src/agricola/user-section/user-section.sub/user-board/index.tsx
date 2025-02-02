import { SpaceHeight } from '@/shared/components/space-height';
import { Player } from '@/shared/recoil';
import { Barn } from '@/shared/resource/barn';
import { Clay } from '@/shared/resource/clay';
import { Farmer } from '@/shared/resource/farmer';
import { Grain } from '@/shared/resource/grain';
import { MeepleBagging } from '@/shared/resource/meeple-bagging';
import { MeepleFence } from '@/shared/resource/meeple-fence';
import { MeepleFirst } from '@/shared/resource/meeple-first';
import { MeepleFood } from '@/shared/resource/meeple-food';
import { Reed } from '@/shared/resource/reed';
import { Stone } from '@/shared/resource/stone';
import { Vegetable } from '@/shared/resource/vegetable';
import { Wood } from '@/shared/resource/wood';
import styled from '@emotion/styled';

type Props = {
  player: Player;
};

export const UserBoard = ({ player }: Props) => {
  const resourceList = [
    {
      Component: <Wood width={15} height={20} />,
      count: player.wood,
    },
    {
      Component: <Clay width={15} height={20} />,
      count: player.clay,
    },
    {
      Component: <Stone width={15} height={20} />,
      count: player.stone,
    },
    {
      Component: <Reed width={15} height={20} />,
      count: player.reed,
    },
    {
      Component: <Grain width={15} height={20} />,
      count: player.grain,
    },
    {
      Component: <Vegetable width={15} height={20} />,
      count: player.vegetable,
    },
    {
      Component: <MeepleFood width={15} height={20} />,
      count: player.food,
    },
  ];

  const 울타리수 = player.slots.filter(value => value.type === '울타리').length * 4;
  const 빈울타리수 = player.slots
    .filter(value => value.type === '울타리')
    .reduce((acc, cur) => {
      return acc + Number(cur.emptyFenceDirections?.length || 0);
    }, 0);

  const 외양간수 = player.slots.filter(slot => slot.barn !== undefined).length;

  const EtcRecourseList = [
    {
      Component: <Farmer width={15} height={20} userNumber={player.number} />,
      count: player.farmer,
    },
    {
      Component: <MeepleFence width={15} height={20} userNumber={player.number} />,
      count: 울타리수 - 빈울타리수,
    },
    {
      Component: <Barn width={15} height={20} userNumber={player.number} />,
      count: 외양간수,
    },
    {
      Component: <MeepleBagging width={20} height={20} />,
      count: player.bagging,
    },
  ];

  return (
    <Container>
      <div className="flex justify-between">
        <div className="flex items-center gap-[15px]">
          <Circle color={player.color} />
          <div>
            <div className="font-bold">{player.name}</div>
          </div>
        </div>
        {player.isFirst && <MeepleFirst width={17} height={35} />}
      </div>
      <SpaceHeight height={20} />
      <div className="flex flex-wrap gap-[10px]">
        {resourceList.map(({ Component, count }, index) => {
          return (
            <div className="flex items-center gap-[5px]" key={index}>
              <div className="font-bold">{count}</div>
              <div>{Component}</div>
            </div>
          );
        })}
      </div>

      <hr className="border-1 border-solid border-[#80502e] my-[5px]" />
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
  /* height: 190px; */
`;

const Circle = styled.div<{ color: string }>`
  width: 20px;
  height: 20px;
  background-color: ${({ color }) => color};
  border-radius: 50%;
`;
