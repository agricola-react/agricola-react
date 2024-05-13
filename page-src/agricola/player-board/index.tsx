import { Player, playersState } from '@/shared/recoil';
import styled from '@emotion/styled';
import { produce } from 'immer';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { Slot } from './player-board.sub/slot';
import { getUpdatedSlots } from '../shared/utils/get-updated-slots';
import { Dialog } from '@radix-ui/themes';

type Props = {
  playerNumber: number;
};

export const PlayerSlots = ({ playerNumber }: Props) => {
  const [players, setPlayers] = useRecoilState(playersState);
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
    // // homeFarmer 값이 증가한 경우 -> homeFarmer를 방에 추가
    // if (owner.homeFarmer > boardFarmers) {
    //   setPlayers(
    //     produce(_players => {
    //       _players[playerNumber - 1].slots = getUpdatedSlots(
    //         _players[playerNumber - 1].slots,
    //         'increase'
    //       );
    //     })
    //   );
    //   return;
    // }
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
      <div className="flex items-center justify-center gap-3">
        <Dialog.Root>
          <Dialog.Trigger>
            <div>직업카드</div>
          </Dialog.Trigger>

          <Dialog.Content>
            <Dialog.Title>Edit profile</Dialog.Title>
            <Dialog.Description size="2" mb="4">
              Make changes to your profile.
            </Dialog.Description>
          </Dialog.Content>
        </Dialog.Root>
        <Dialog.Root>
          <Dialog.Trigger>
            <div>보조설비</div>
          </Dialog.Trigger>
        </Dialog.Root>
        <Dialog.Root>
          <Dialog.Trigger>
            <div>주요설비</div>
          </Dialog.Trigger>
        </Dialog.Root>
      </div>
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
