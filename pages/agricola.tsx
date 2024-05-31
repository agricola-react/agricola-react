import {
  currentActionState,
  currentPlayerIndexState,
  playersState,
  resultModalOpenState,
  roundState,
} from '@/shared/recoil';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { CentralBoard } from 'page-src/agricola/central-board';
import { Tutoring4 } from 'page-src/agricola/central-board/central-board.sub/action-board/교습(4인용추가판)';
import { Bush } from 'page-src/agricola/central-board/central-board.sub/action-board/덤불';
import { Thicket } from 'page-src/agricola/central-board/central-board.sub/action-board/수풀';
import { TravelingTheater } from 'page-src/agricola/central-board/central-board.sub/action-board/유랑극단';
import { ResourceMarket } from 'page-src/agricola/central-board/central-board.sub/action-board/자원시장';
import { ClayQuarry } from 'page-src/agricola/central-board/central-board.sub/action-board/점토채굴장';
import { Header } from 'page-src/agricola/header';
import { PlayerSlots } from 'page-src/agricola/player-board';
import ResultModal from 'page-src/agricola/result-modal';
import { calculateFeedingCount } from 'page-src/agricola/shared/utils/calculate-feeding-count';
import { harvest } from 'page-src/agricola/shared/utils/harvest';
import { UserSection } from 'page-src/agricola/user-section';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

const harvest_rounds = [5, 8, 10, 12, 15, 16];

const AgricolaPage = () => {
  const [isBottom, setIsBottom] = useState(false);
  const router = useRouter();
  const [players, setPlayers] = useRecoilState(playersState);
  const [round, setRound] = useRecoilState(roundState);
  const [, setCurrentPlayerIndex] = useRecoilState(currentPlayerIndexState);
  const action = useRecoilValue(currentActionState);
  const setResultModalOpenState = useSetRecoilState(resultModalOpenState);

  const homeFarmers = players.reduce((acc, cur) => {
    return acc + cur.homeFarmer;
  }, 0);

  useEffect(() => {
    const value = window.sessionStorage.getItem('isAccept');
    if (!value) {
      router.replace('/');
    }
  }, []);

  useEffect(() => {
    // 라운드가 끝났으면 다음 라운드로 넘어가기

    if (homeFarmers === 0 && action === null) {
      setRound(round => round + 1);
    }
  }, [homeFarmers, action]);

  useEffect(() => {
    // 2초 여유시간
    setTimeout(() => {
      const firstPlayerIndex = players.findIndex(player => player.isFirst);
      setCurrentPlayerIndex(firstPlayerIndex);
      /**
       * 수확로직 (harvest_rounds로 넘어가기전 실행)
       * 1. 작물수확(TODO)
       * 2. 가족먹여살리기
       * 3. 번식(TODO)
       */
      const isHarvestTime = harvest_rounds.includes(round);

      if (isHarvestTime) {
        alert(`수확 및 가족 먹여살리기 시간입니다.`);
      }

      setPlayers(
        players.map(_player => {
          // 0. 수확전 카드 사용여부
          let addWood = 0;
          let addClay = 0;
          let addReed = 0;
          let addFood = 0;

          const 부엌방가지고있고나무집에살고있는지 =
            _player.subCards.find(card => card.name === '부엌방' && card.isActive) &&
            _player.roomType === 'wood';

          // 주요설비 카드 사용여부 확인
          const 가구제작소가지고있는지 = _player.mainCards.some(card => card.name === '가구제작소');
          if (가구제작소가지고있는지) {
            const 가구제작소나무사용갯수 = Number(
              prompt(
                `가구제작소를 사용하시겠습니까?\n 사용하신다면 사용할 나무 갯수를 적어주시고 아니라면 0을 입력해주세요`
              )
            );

            if (가구제작소나무사용갯수 <= _player.wood && 가구제작소나무사용갯수 > 0) {
              addWood -= 가구제작소나무사용갯수;
              addFood += 가구제작소나무사용갯수 * 2;
            }
          }

          const 그릇제작소가지고있는지 = _player.mainCards.some(card => card.name === '가구제작소');
          if (그릇제작소가지고있는지) {
            const 그릇제작소흙사용갯수 = Number(
              prompt(
                `그릇제작소를 사용하시겠습니까?\n 사용하신다면 사용할 나무 갯수를 적어주시고 아니라면 0을 입력해주세요`
              )
            );

            if (그릇제작소흙사용갯수 <= _player.clay && 그릇제작소흙사용갯수 > 0) {
              addClay -= 그릇제작소흙사용갯수;
              addFood += 그릇제작소흙사용갯수 * 2;
            }
          }

          const 바구니제작소가지고있는지 = _player.mainCards.some(
            card => card.name === '가구제작소'
          );
          if (바구니제작소가지고있는지) {
            const 바구니제작소갈대사용갯수 = Number(
              prompt(
                `바구니제작소를 사용하시겠습니까?\n 사용하신다면 사용할 나무 갯수를 적어주시고 아니라면 0을 입력해주세요`
              )
            );

            if (바구니제작소갈대사용갯수 <= _player.reed && 바구니제작소갈대사용갯수 > 0) {
              addClay -= 바구니제작소갈대사용갯수;
              addFood += 바구니제작소갈대사용갯수 * 3;
            }
          }

          // 1. 수확
          const player = isHarvestTime ? harvest(_player) : _player;
          // 2. 가족 먹여 살리기
          const { newFood, newGrain, newVegetable, remainingFood } = calculateFeedingCount({
            farmer: player.farmer,
            food: player.food + addFood,
            grain: player.grain,
            vegetable: player.vegetable,
            baby: player.baby,
          });

          if (isHarvestTime) {
            alert(
              `${player.number} 유저 가족 먹여살라기 결과입니다.\n 남은 음식:${newFood} / 남은 곡식:${newGrain} / 남은 채소:${newVegetable} / 남은 내야할 음식:${remainingFood}`
            );
          }

          const resultFood = 부엌방가지고있고나무집에살고있는지 ? newFood + 1 : newFood;

          const food = isHarvestTime
            ? resultFood
            : 부엌방가지고있고나무집에살고있는지
              ? player.food + 1
              : player.food;

          return {
            ...player,
            farmer: player.farmer + player.baby,
            homeFarmer: player.farmer + player.baby,
            baby: 0,
            wood: player.wood + addWood,
            clay: player.clay + addClay,
            reed: player.reed + addReed,
            food,
            grain: isHarvestTime ? newGrain : player.grain,
            vegetable: isHarvestTime ? newVegetable : player.vegetable,
            bagging: isHarvestTime
              ? remainingFood > 0
                ? player.bagging + remainingFood
                : player.bagging
              : player.bagging,
          };
        })
      );

      // 마지막 결과확인
      if (round === 15) {
        setResultModalOpenState(true);
      }
    }, 0);
  }, [round]);

  return (
    <StyledBackground>
      <Header />
      <div className="flex">
        <div>
          <Bush />
          <Thicket />
          <ResourceMarket />
          <ClayQuarry />
          <Tutoring4 />
          <TravelingTheater />
        </div>

        <BoardWrapper className="ml-40">
          <CentralBoard />
          <UserSection />
        </BoardWrapper>
      </div>
      <PlayerBoardWrapper>
        {players.map(player => (
          <PlayerSlots key={player.number} playerNumber={player.number} />
        ))}
      </PlayerBoardWrapper>
      <ResultModal />
      <FloatingButton
        onClick={() => {
          const height = isBottom ? 0 : document.body.scrollHeight;
          window.scrollTo({
            top: height,
            behavior: 'smooth',
          });
          setIsBottom(prev => !prev);
        }}
      >
        {isBottom ? '위로' : '아래로'}
      </FloatingButton>
      <FloatingTopButton
        onClick={() => {
          setResultModalOpenState(true);
        }}
      >
        현재 점수 보기
      </FloatingTopButton>
    </StyledBackground>
  );
};

const StyledBackground = styled.div`
  background-image: url('https://x.boardgamearena.net/data/themereleases/current/games/agricola/220107-0030/img/background.jpg');
  background-repeat: repeat;
  overflow: scroll;
  height: 100%;
  width: 100%;
  padding-top: 10px;
`;

const BoardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 30px;
  padding-top: 10px;
`;

const PlayerBoardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const FloatingButton = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: white;
  border: 1px solid black;
  border-radius: 50%;
  width: 70px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  font-size: 20px;
  font-weight: bold;
`;

const FloatingTopButton = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: white;
  border: 1px solid black;
  border-radius: 10px;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  font-size: 20px;
  font-weight: bold;
`;

export default AgricolaPage;
