import { Player, playersState } from '@/shared/recoil';
import styled from '@emotion/styled';
import { produce } from 'immer';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { getUpdatedSlots } from '../shared/utils/get-updated-slots';
import { Slot } from './player-board.sub/slot';
import { JobCardModal } from 'page-src/agricola/player-board/player-board.sub/card/job-card-modal';

type Props = {
  playerNumber: number;
};

export const PlayerSlots = ({ playerNumber }: Props) => {
  const [players, setPlayers] = useRecoilState(playersState);
  const [openJobCard, setOpenJobCard] = useState(false);
  const owner = players.find(player => player.number === playerNumber) as Player;

  const playerSlots = owner.slots;

  const boardFarmers = owner.slots.reduce((sum, cur) => {
    if (cur.type === '방' && cur.resource === '사람') return sum + cur.count;
    return sum;
  }, 0);

  useEffect(() => {
    if (owner === undefined) return;
    // homeFarmer 값이 감소한 경우 -> homeFarmer를 방에서 없앤다
    if (owner.homeFarmer < boardFarmers) {
      setPlayers(
        produce(_players => {
          _players[playerNumber - 1].slots = getUpdatedSlots(
            _players[playerNumber - 1].slots,
            'reduce'
          );
        })
      );
      return;
    }
    // 모두 복귀 -> homeFarmer를 모든 방에 넣는다
    if (owner.homeFarmer === owner.farmer) {
      setPlayers(
        produce(_players => {
          _players[playerNumber - 1].slots = getUpdatedSlots(
            _players[playerNumber - 1].slots,
            'fill',
            owner
          );
        })
      );
      return;
    }
  }, [owner?.homeFarmer, owner?.farmer]);

  return (
    <Container>
      <Title>
        <h4>{owner?.name} 보드</h4>
      </Title>
      <Wrapper>
        {playerSlots.map((info, index) => (
          <Slot
            key={`slot${index}`}
            type={info.type}
            resourceType={info.resource}
            count={info.count}
            index={index}
            playerNumber={playerNumber}
          />
        ))}
      </Wrapper>
      <div className="flex items-center justify-center gap-3 mb-7">
        <CardContainer bgColor="yellow" onClick={() => setOpenJobCard(true)}>
          <img className="w-16 mt-3" src="/job-card/직업카드.jpg" alt="" />
          <div className="font-bold">직업카드</div>
        </CardContainer>
        <CardContainer bgColor="orange">
          <img className="w-16 mt-3" src="/assistant-card/보조카드.jpg" alt="" />
          <div className="font-bold">보조설비</div>
        </CardContainer>
        <CardContainer bgColor="red">
          <img className="w-16 mt-3" src="/main-card/주요설비.jpg" alt="" />
          <div className="font-bold">주요설비</div>
        </CardContainer>
      </div>
      <JobCardModal open={openJobCard} setOpen={setOpenJobCard} player={owner} isAction={false} />
    </Container>
  );
};

const Container = styled.div`
  border: solid 1px black;
`;

const Title = styled.div`
  display: inline-block;
  padding: 5px;
  background-color: hsla(0, 0%, 100%, 0.5);
  color: gray;
`;

const Wrapper = styled.div`
  padding: 50px 0;
  width: 660px;
  height: 500px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-items: center;
`;

const CardContainer = styled.div<{ bgColor: string }>`
  &:hover {
    background-color: ${props => props.bgColor};
  }
  cursor: pointer;
  width: 5rem; /* Tailwind w-20 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 8rem; /* Tailwind h-32 */
`;
