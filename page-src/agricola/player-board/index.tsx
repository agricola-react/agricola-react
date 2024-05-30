import {
  Player,
  PlayerAction,
  Position,
  SlotValue,
  currentActionState,
  playersState,
  tempSelectedFenceIndexState,
} from '@/shared/recoil';
import styled from '@emotion/styled';
import { produce } from 'immer';
import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { getUpdatedSlots } from '../shared/utils/get-updated-slots';
import { Slot } from './player-board.sub/slot';
import { JobCardModal } from 'page-src/agricola/player-board/player-board.sub/card/job-card-modal';
import { useCurrentPlayer } from '../shared/hooks/use-current-player';
import { SubCardModal } from './player-board.sub/card/sub-card-modal';
import { MainCardModal } from '@/shared/components/main-card-modal';
import { getTwoDimensionBoard } from '../shared/utils/get-two-dimension-board';
import { COL, ROW } from '@/shared/constants';
import { d, validatePosition } from '../shared/utils/is-near-position';

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

  const handleEndAction = (type: PlayerAction) => {
    switch (type) {
      case '씨뿌리기':
        setAction({ type: '씨뿌리기', isDone: true });
        break;
      case '울타리 설치':
        //TODO: 검증 로직 + slots 업데이트
        //? 1. fenceId 결정하기
        // eslint-disable-next-line no-case-declarations
        const fenceId =
          owner.slots.reduce((acc, cur) => {
            if (cur.fenceId) return max(acc, cur.fenceId);
            return acc;
          }, 0) + 1;

        //? 2. 이중 배열 변환
        // eslint-disable-next-line no-case-declarations
        const slotBoard = getTwoDimensionBoard(owner.slots);
        // eslint-disable-next-line no-case-declarations
        let totalFence = 0;

        //? 3. 검증
        // eslint-disable-next-line no-case-declarations
        const tempSlots = [...playerSlots];

        console.log(tempSelectedFenceIndex);

        tempSelectedFenceIndex.forEach(position => {
          const row = Math.floor(position / ROW);
          const col = position % ROW;
          const emptyDirections: Position[] = []; // 비어있는 위치
          d.forEach(({ dr, dc }, i) => {
            const next_row = row + dr;
            const next_col = col + dc;
            if (validatePosition(next_row, next_col)) {
              const slot = slotBoard[next_row][next_col];
              console.log(`[${next_row}] [${next_col}] fenceId >>>`, slot.fenceId);
              //? 필요한 개수 계산하기
              const next_index = next_row * COL + next_col;
              console.log(`[${next_row}] [${next_col}] next_index >>>`, next_index);
              if (slot.fenceId === undefined && !tempSelectedFenceIndex.includes(next_index)) {
                ++totalFence;
              } else {
                emptyDirections.push(i);
              }
            } else {
              ++totalFence;
            }
          });

          tempSlots[position] = {
            ...tempSlots[position],
            fenceId,
            emptyFenceDirections: emptyDirections,
          };
        });

        //? 4. 검증2 - 자원개수
        if (owner.wood < totalFence) {
          alert(`[울타리 설치] 울타리가 부족합니다.`);
          //TODO: 다시 선택할 수 있도록
          break;
        }

        console.log(`tempSlots >>>`, tempSlots);
        //? setPlayers
        setPlayers(
          produce(_players => {
            _players[playerNumber - 1].fence += totalFence;
            _players[playerNumber - 1].wood -= totalFence;
            _players[playerNumber - 1].slots = tempSlots;
          })
        );

        setTempSelectedFenceIndexState([]);
        break;

      default:
        break;
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
          <ActionButton onClick={() => handleEndAction(action.type)}>
            <strong>[{action?.type}]</strong> 액션 종료
          </ActionButton>
        )}
        {currentPlayer.number === playerNumber && action?.type === '울타리 설치' && (
          <div>
            <ActionButton onClick={() => handleEndAction(action.type)}>
              <strong>[{action?.type}]</strong> 완료
            </ActionButton>
            <ActionButton onClick={() => handleEndAction(action.type)}>
              <strong>[{action?.type}]</strong> 액션 종료
            </ActionButton>
          </div>
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
