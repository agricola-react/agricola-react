import {
  Player,
  PlayerAction,
  currentActionState,
  playersState,
  tempSelectedFenceIndexState,
} from '@/shared/recoil';
import styled from '@emotion/styled';
import { produce } from 'immer';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { getUpdatedSlots } from '../shared/utils/get-updated-slots';
import { Slot } from './player-board.sub/slot';
import { JobCardModal } from 'page-src/agricola/player-board/player-board.sub/card/job-card-modal';
import { useCurrentPlayer } from '../shared/hooks/use-current-player';
import { SubCardModal } from './player-board.sub/card/sub-card-modal';
import { MainCardModal } from '@/shared/components/main-card-modal';
import { 울타리action } from '../shared/utils/do-action/울타리action';

type Props = {
  playerNumber: number;
};

export const PlayerSlots = ({ playerNumber }: Props) => {
  const [players, setPlayers] = useRecoilState(playersState);
  const [openJobCard, setOpenJobCard] = useState(false);
  const [openSubCard, setOpenSubCard] = useState(false);
  const [openMainCard, setOpenMainCard] = useState(false);
  const owner = players.find(player => player.number === playerNumber) as Player;

  const [action, setAction] = useRecoilState(currentActionState);
  const { currentPlayer } = useCurrentPlayer();
  const [tempSelectedFenceIndex, setTempSelectedFenceIndexState] = useRecoilState(
    tempSelectedFenceIndexState
  );

  const playerSlots = owner.slots;

  const boardFarmers = owner.slots.reduce((sum, cur) => {
    if (cur.type === '방' && cur.resource === '사람') return sum + cur.count;
    return sum;
  }, 0);

  const handleAction = (type: PlayerAction) => {
    switch (type) {
      case '씨뿌리기':
        setAction({ type: '씨뿌리기', isDone: true });
        break;
      case '울타리 설치':
        // eslint-disable-next-line no-case-declarations
        const resultPlayer = 울타리action(owner, tempSelectedFenceIndex);

        if (resultPlayer !== null) {
          setPlayers(
            produce(_players => {
              _players[playerNumber - 1] = resultPlayer;
            })
          );
        }
        setTempSelectedFenceIndexState([]);
        break;

      default:
        break;
    }
  };

  const handleEndAction = (type: PlayerAction) => {
    if (type === '울타리 설치') {
      setTempSelectedFenceIndexState([]);
      setAction({
        type: '울타리 설치',
        isDone: true,
      });
      return;
    }

    if (type === '가축 추가') {
      setAction({
        ...action,
        type: '가축 추가',
        isDone: true,
      });
      return;
    }
  };

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
      <TitleContainer>
        <Title>
          <h4>{owner?.name} 보드</h4>
        </Title>
        {currentPlayer.number === playerNumber && action?.type === '씨뿌리기' && (
          <ActionButton onClick={() => handleAction(action.type)}>
            <strong>[{action?.type}]</strong> 액션 종료
          </ActionButton>
        )}
        {currentPlayer.number === playerNumber && action?.type === '울타리 설치' && (
          <div>
            <ActionButton onClick={() => handleAction(action.type)}>
              <strong>[{action?.type}]</strong> 완료
            </ActionButton>
            <ActionButton onClick={() => handleEndAction(action.type)}>
              <strong>[{action?.type}]</strong> 액션 종료
            </ActionButton>
          </div>
        )}
        {currentPlayer.number === playerNumber && action?.type === '가축 추가' && (
          <ActionButton onClick={() => handleEndAction(action.type)}>
            <strong>[{action?.type}]</strong> 액션 종료
          </ActionButton>
        )}
      </TitleContainer>
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
        <CardContainer bgColor="orange" onClick={() => setOpenSubCard(true)}>
          <img className="w-16 mt-3" src="/sub-card/보조카드.jpg" alt="" />
          <div className="font-bold">보조설비</div>
        </CardContainer>
        <CardContainer bgColor="red" onClick={() => setOpenMainCard(true)}>
          <img className="w-16 mt-3" src="/main-card/주요설비.jpg" alt="" />
          <div className="font-bold">주요설비</div>
        </CardContainer>
      </div>
      <JobCardModal open={openJobCard} setOpen={setOpenJobCard} player={owner} isAction={false} />
      <SubCardModal open={openSubCard} setOpen={setOpenSubCard} player={owner} isAction={false} />
      <MainCardModal
        open={openMainCard}
        setOpen={setOpenMainCard}
        player={owner}
        isAction={false}
        mainCards={owner.mainCards}
      />
    </Container>
  );
};

const Container = styled.div`
  border: solid 1px black;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.div`
  padding: 5px;
  background-color: hsla(0, 0%, 100%, 0.5);
  color: gray;
`;

const ActionButton = styled.button`
  cursor: pointer;
  padding: 5px;
  background-color: #ffffff;
  border-radius: 10px;
  border: solid 1px black;
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
