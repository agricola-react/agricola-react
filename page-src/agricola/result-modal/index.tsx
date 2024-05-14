import { playersState, resultModalOpenState } from '@/shared/recoil';
import { Barn } from '@/shared/resource/barn';
import { Grain } from '@/shared/resource/grain';
import { MeepleCattle } from '@/shared/resource/meeple-cattle';
import { MeepleField } from '@/shared/resource/meeple-field';
import { MeeplePig } from '@/shared/resource/meeple-pig';
import { MeepleSheep } from '@/shared/resource/meeple-sheep';
import { Vegetable } from '@/shared/resource/vegetable';
import styled from '@emotion/styled';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross1Icon } from '@radix-ui/react-icons';
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
    // 가축 점수

    const cattleScore = getCattleScore(player.cattle);
    console.log(cattleScore, 'cattleScore');
    const sheepScore = getSheepScore(player.sheep);
    const pigScore = getSheepScore(player.sheep);

    // 음식점수
    const grainScore = getGrainScore(player.grain);
    const vegetableScore = getVegetableScore(player.vegetable);

    // 농지 점수
    const fieldScore = getFieldScore(player.slots.filter(slot => slot.type === '밭').length);
    // 울타리 추가해야함

    // 비어있는 밭 점수
    const emptySlotScore = player.slots.filter(slot => slot.type == null).length;

    // 외양간점수
    const barnScore = player.barn;

    // 사람점수
    const farmerScore = player.farmer * 3;

    // 구걸카드
    const baggingScore = player.bagging * 3;

    // 흙방점수 등등

    const totalScore =
      cattleScore +
      sheepScore +
      pigScore +
      grainScore +
      fieldScore -
      emptySlotScore +
      barnScore +
      farmerScore -
      baggingScore;

    return {
      ...player,
      cattleScore,
      sheepScore,
      pigScore,
      grainScore,
      vegetableScore,
      emptySlotScore,
      barnScore,
      farmerScore,
      fieldScore,
      baggingScore,
      totalScore,
    };
  });

  const tableList = [
    {
      name: '소',
      players: playersWithCore.map(player => ({
        count: player.cattle,
        score: player.cattleScore,
        Icon: <MeepleCattle width={20} height={20} />,
      })),
    },
    {
      name: '돼지',
      players: playersWithCore.map(player => ({
        count: player.pig,
        score: player.pigScore,
        Icon: <MeeplePig width={20} height={20} />,
      })),
    },
    {
      name: '양',
      players: playersWithCore.map(player => ({
        count: player.sheep,
        score: player.sheepScore,
        Icon: <MeepleSheep width={20} height={20} />,
      })),
    },
    {
      name: '곡식',
      players: playersWithCore.map(player => ({
        count: player.grain,
        score: player.grainScore,
        Icon: <Grain width={20} height={20} />,
      })),
    },
    {
      name: '채소',
      players: playersWithCore.map(player => ({
        count: player.grain,
        score: player.grainScore,
        Icon: <Vegetable width={20} height={20} />,
      })),
    },
    {
      name: '밭',
      players: playersWithCore.map(player => ({
        count: player.slots.filter(slot => slot.type === '밭').length,
        score: player.fieldScore,
        Icon: <MeepleField width={25} height={15} />,
      })),
    },
    {
      name: '빈칸',
      players: playersWithCore.map(player => ({
        count: player.slots.filter(slot => slot.type == null).length,
        score: player.emptySlotScore,
        Icon: <img src="/empty_slot.png" width={20} height={20} alt="빈칸" />,
      })),
    },
    {
      name: '외양간',
      players: playersWithCore.map(player => ({
        count: player.barn,
        score: player.barnScore,
        Icon: <Barn width={20} height={20} />,
      })),
    },
  ];

  return (
    <Dialog.Root open={resultModalOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay">
          <Dialog.Content
            className="DialogContent"
            style={{
              width: '600px',
            }}
          >
            <div
              onClick={() => {
                setResultModalOpen(false);
              }}
              className="flex justify-end mb-[10px] cursor-pointer"
            >
              <Cross1Icon width={20} height={20} />
            </div>
            <div className="text-center pb-[10px]">3번 플레어이어가 1등입니다!!</div>
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
                    {players.map(player => (
                      <StyledTd colSpan={2} key={player.number}>
                        10점
                      </StyledTd>
                    ))}
                  </StyledTr>
                </tbody>
              </StyledTable>
            </div>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
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
