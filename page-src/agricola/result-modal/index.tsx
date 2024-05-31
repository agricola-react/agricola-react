import { ModalContainer } from '@/shared/components/modal-container';
import { playersState, resultModalOpenState } from '@/shared/recoil';
import { Barn } from '@/shared/resource/barn';
import { Farmer } from '@/shared/resource/farmer';
import { Grain } from '@/shared/resource/grain';
import { MeepleCattle } from '@/shared/resource/meeple-cattle';
import { MeepleField } from '@/shared/resource/meeple-field';
import { MeeplePig } from '@/shared/resource/meeple-pig';
import { MeepleSheep } from '@/shared/resource/meeple-sheep';
import { RoomClay } from '@/shared/resource/room-clay';
import { Vegetable } from '@/shared/resource/vegetable';
import styled from '@emotion/styled';
import { CardStackIcon, CardStackPlusIcon, FrameIcon, IdCardIcon } from '@radix-ui/react-icons';
import { getCattleScore } from 'page-src/agricola/result-modal/utils/get-cattle-score';
import { getFieldScore } from 'page-src/agricola/result-modal/utils/get-field-score';
import { getGrainScore } from 'page-src/agricola/result-modal/utils/get-grain-score';
import { getSheepScore } from 'page-src/agricola/result-modal/utils/get-sheep-score';
import { getVegetableScore } from 'page-src/agricola/result-modal/utils/get-vegetable-score';
import { useRecoilState, useRecoilValue } from 'recoil';

const ResultModal = () => {
  const [resultModalOpen, setResultModalOpen] = useRecoilState(resultModalOpenState);
  const players = useRecoilValue(playersState);

  const playersWithCore = players.map(player => {
    // 농지 점수

    const fieldScore = getFieldScore(player.slots.filter(slot => slot.type === '밭').length);

    // 울타리 추가해야함

    // 곡식점수
    const grainScore = getGrainScore(player.grain);

    //채소점수
    const vegetableScore = getVegetableScore(player.vegetable);

    // 양 점수
    const sheepScore = getSheepScore(player.sheep);

    //돼지
    const pigScore = getSheepScore(player.pig);

    //소
    const cattleScore = getCattleScore(player.cattle);

    // 비어있는 밭 점수
    const emptySlotScore = -player.slots.filter(slot => slot.type == null).length;

    // 외양간점수
    const barnScore = player.barn;

    //흙집방
    const clayRoomScore =
      player.roomType === 'clay' ? player.slots.filter(slot => slot.type === '방').length : 0;
    //돌집방
    const stoneRoomScore =
      player.roomType === 'stone' ? player.slots.filter(slot => slot.type === '방').length * 2 : 0;
    // 사람점수
    const farmerScore = player.farmer * 3;

    // 구걸카드
    const baggingScore = -player.bagging * 3;

    // 직업카드점수 / 보조설비 + 주요설비

    const 활성된보조설비 = player.subCards.find(subCard => subCard.isActive);
    const 활성된주요설비 = player.mainCards.find(mainCard => mainCard.isActive);

    let 보조설비점수: number = 0;
    let 주요설비점수: number = 0;

    if (활성된보조설비) {
      //플레이어1
      const 다진흙찾기 = player.subCards.find(subCard => subCard.name === '다진흙');
      const 물통찾기 = player.subCards.find(subCard => subCard.name === '물통');
      const 부엌방찾기 = player.subCards.find(subCard => subCard.name === '부엌방');
      //플레이어2
      const 네덜란드식풍차찾기 = player.subCards.find(subCard => subCard.name === '네덜란드식풍차');
      const 병찾기 = player.subCards.find(subCard => subCard.name === '병');
      const 통나무배찾기 = player.subCards.find(subCard => subCard.name === '통나무배');
      //플레이어3
      const 목재소찾기 = player.subCards.find(subCard => subCard.name === '목재소');
      const 채굴망치찾기 = player.subCards.find(subCard => subCard.name === '채굴망치');
      const 돌집게찾기 = player.subCards.find(subCard => subCard.name === '돌집게');
      //플레이어4
      const 곡식용삽찾기 = player.subCards.find(subCard => subCard.name === '곡식용삽');
      const 버터제조기찾기 = player.subCards.find(subCard => subCard.name === '버터제조기');
      const 삽찾기 = player.subCards.find(subCard => subCard.name === '삽');

      if (다진흙찾기 !== undefined) {
        보조설비점수 += 다진흙찾기.score;
      }
      if (물통찾기 !== undefined) {
        보조설비점수 += 물통찾기.score;
      }
      if (부엌방찾기 !== undefined) {
        보조설비점수 += 부엌방찾기.score;
      }
      if (네덜란드식풍차찾기 !== undefined) {
        보조설비점수 += 네덜란드식풍차찾기.score;
      }
      if (병찾기 !== undefined) {
        보조설비점수 += 병찾기.score;
        console.log(보조설비점수);
      }
      if (통나무배찾기 !== undefined) {
        보조설비점수 += 통나무배찾기.score;
      }
      if (목재소찾기 !== undefined) {
        보조설비점수 += 목재소찾기.score;
      }
      if (채굴망치찾기 !== undefined) {
        보조설비점수 += 채굴망치찾기.score;
      }
      if (돌집게찾기 !== undefined) {
        보조설비점수 += 돌집게찾기.score;
      }
      if (곡식용삽찾기 !== undefined) {
        보조설비점수 += 곡식용삽찾기.score;
      }
      if (버터제조기찾기 !== undefined) {
        보조설비점수 += 버터제조기찾기.score;
      }
      if (삽찾기 !== undefined) {
        보조설비점수 += 삽찾기.score;
      }
    }

    if (활성된주요설비) {
      const 화로찾기 = player.mainCards.find(mainCard => mainCard.name === '화로');
      const 화로2찾기 = player.mainCards.find(mainCard => mainCard.name === '화로2');
      const 화덕찾기 = player.mainCards.find(mainCard => mainCard.name === '화덕');
      const 화덕5찾기 = player.mainCards.find(mainCard => mainCard.name === '화덕5');
      const 우물찾기 = player.mainCards.find(mainCard => mainCard.name === '우물');
      const 흙가마찾기 = player.mainCards.find(mainCard => mainCard.name === '흙가마');
      const 돌가마찾기 = player.mainCards.find(mainCard => mainCard.name === '돌가마');
      const 가구제작소찾기 = player.mainCards.find(mainCard => mainCard.name === '가구제작소');
      const 그릇제작소찾기 = player.mainCards.find(mainCard => mainCard.name === '그릇제작소');
      const 바구니제작소찾기 = player.mainCards.find(mainCard => mainCard.name === '바구니제작소');

      if (화로찾기 !== undefined) {
        주요설비점수 += 화로찾기.score;
      }
      if (화로2찾기 !== undefined) {
        주요설비점수 += 화로2찾기.score;
      }
      if (화덕찾기 !== undefined) {
        주요설비점수 += 화덕찾기.score;
      }
      if (화덕5찾기 !== undefined) {
        주요설비점수 += 화덕5찾기.score;
      }
      if (우물찾기 !== undefined) {
        주요설비점수 += 우물찾기.score;
      }
      if (흙가마찾기 !== undefined) {
        주요설비점수 += 흙가마찾기.score;
      }
      if (돌가마찾기 !== undefined) {
        주요설비점수 += 돌가마찾기.score;
      }
      if (가구제작소찾기 !== undefined) {
        주요설비점수 += 가구제작소찾기.score;
      }
      if (그릇제작소찾기 !== undefined) {
        주요설비점수 += 그릇제작소찾기.score;
      }
      if (바구니제작소찾기 !== undefined) {
        주요설비점수 += 바구니제작소찾기.score;
      }
    }

    // 주요설비점수

    // 추가점수
    let 카드점수 = 보조설비점수 + 주요설비점수;
    let bonusPoint = 0;

    const totalScore =
      fieldScore +
      grainScore +
      vegetableScore +
      sheepScore +
      pigScore +
      cattleScore +
      emptySlotScore +
      barnScore +
      clayRoomScore +
      stoneRoomScore +
      farmerScore +
      baggingScore +
      카드점수 +
      bonusPoint;

    return {
      ...player,
      fieldScore,
      grainScore,
      vegetableScore,
      sheepScore,
      pigScore,
      cattleScore,
      emptySlotScore,
      barnScore,
      clayRoomScore,
      stoneRoomScore,
      farmerScore,
      baggingScore,
      카드점수,
      bonusPoint,
      totalScore,
    };
  });

  const tableList = [
    {
      name: '밭',
      players: playersWithCore.map(player => ({
        count: player.slots.filter(slot => slot.type === '밭').length,
        score: player.fieldScore,
        Icon: <MeepleField width={25} height={15} />,
      })),
    },
    // {
    //   name: '울타리',
    //   players: playersWithCore.map(player => ({
    //     count: player.slots.filter(slot => slot.type === '밭').length,
    //     score: player.fieldScore,
    //     Icon: <FrameIcon width={25} height={15} />,
    //   })),
    // },
    // {
    //   name: '곡식',
    //   players: playersWithCore.map(player => ({
    //     count: player.grain,
    //     score: player.grainScore,
    //     Icon: <Grain width={20} height={20} />,
    //   })),
    // },
    // {
    //   name: '채소',
    //   players: playersWithCore.map(player => ({
    //     count: player.grain,
    //     score: player.grainScore,
    //     Icon: <Vegetable width={20} height={20} />,
    //   })),
    // },
    // {
    //   name: '양',
    //   players: playersWithCore.map(player => ({
    //     count: player.sheep,
    //     score: player.sheepScore,
    //     Icon: <MeepleSheep width={20} height={20} />,
    //   })),
    // },
    // {
    //   name: '돼지',
    //   players: playersWithCore.map(player => ({
    //     count: player.pig,
    //     score: player.pigScore,
    //     Icon: <MeeplePig width={20} height={20} />,
    //   })),
    // },
    // {
    //   name: '소',
    //   players: playersWithCore.map(player => ({
    //     count: player.cattle,
    //     score: player.cattleScore,
    //     Icon: <MeepleCattle width={20} height={20} />,
    //   })),
    // },
    // {
    //   name: '빈칸',
    //   players: playersWithCore.map(player => ({
    //     count: player.slots.filter(slot => slot.type == null).length,
    //     score: player.emptySlotScore,
    //     Icon: <img src="/empty_slot.png" width={20} height={20} alt="빈칸" />,
    //   })),
    // },
    {
      name: '외양간',
      players: playersWithCore.map(player => ({
        count: player.barn,
        score: player.barnScore,
        Icon: <Barn width={20} height={20} />,
      })),
    },
    {
      name: '흙집방',
      players: playersWithCore.map(player => ({
        count: player.clayRoomScore,
        score: player.clayRoomScore,
        Icon: <RoomClay width={15} height={20} />,
      })),
    },
    {
      name: '돌집방',
      players: playersWithCore.map(player => ({
        count: player.stoneRoomScore / 2,
        score: player.stoneRoomScore,
        Icon: <Farmer width={15} height={20} />,
      })),
    },
    {
      name: '가족수',
      players: playersWithCore.map(player => ({
        count: player.farmer,
        score: player.farmerScore,
        Icon: <Farmer width={15} height={20} />,
      })),
    },
    {
      name: '구걸카드',
      players: playersWithCore.map(player => ({
        count: player.bagging,
        score: player.baggingScore,
        Icon: <Farmer width={15} height={20} />,
      })),
    },
    {
      name: '카드 점수',
      players: playersWithCore.map(player => ({
        score: player.카드점수,
        Icon: <Farmer width={15} height={20} />,
      })),
    },
    // {
    //   name: '추가점수',
    //   players: playersWithCore.map(player => ({
    //     score: player.bonusPoint,
    //     Icon: <CardStackPlusIcon width={15} height={20} />,
    //   })),
    // },
  ];
  const playerWithHighestScore = playersWithCore.reduce((max, player) => {
    return player.totalScore > max.totalScore ? player : max;
  }, playersWithCore[0]);

  // const tableScore = if(tableList.map(value => value.players.map(player => player.score)) < 0) return ()

  return (
    <ModalContainer open={resultModalOpen} setOpen={setResultModalOpen} width={600}>
      <div className="text-center pb-[10px]">{playerWithHighestScore.name}이 1등입니다.</div>
      <div className="flex justify-center">
        <StyledTable>
          <StyledThead>
            <StyledTr>
              <StyledTh>분류</StyledTh>
              <StyledTh colSpan={2}>플레이어1</StyledTh>
              <StyledTh colSpan={2}>플레이어2</StyledTh>
              <StyledTh colSpan={2}>플레이어3</StyledTh>
              <StyledTh colSpan={2}>플레이어4</StyledTh>
            </StyledTr>
          </StyledThead>
          <tbody>
            {tableList.map(value => (
              <StyledTr key={value.name}>
                <StyledTd>{value.name}</StyledTd>
                {value.players.map(player => (
                  <>
                    <StyledFlexTd>
                      <div>{player.count}</div>
                      {player.Icon}
                    </StyledFlexTd>
                    <StyledTd>{player.score}점</StyledTd>
                  </>
                ))}
              </StyledTr>
            ))}
            {/* 쭉 StyledTr 이어서 붙이다가 마지막에 결과 */}
            <StyledTr>
              <StyledTd>합계</StyledTd>
              {playersWithCore.map(player => (
                <StyledTd colSpan={2} key={player.number}>
                  {player.totalScore}
                </StyledTd>
              ))}
            </StyledTr>
          </tbody>
        </StyledTable>
      </div>
    </ModalContainer>
  );
};

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const StyledThead = styled.thead``;

const StyledTh = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  height: 45px;
`;

const StyledTr = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;
const StyledTd = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  height: 45px;
`;

const StyledFlexTd = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

export default ResultModal;
