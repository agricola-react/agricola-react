import { currentActionState, roundState } from '@/shared/recoil';
import { MeepleFood } from '@/shared/resource/meeple-food';
import { MeepleOccupation } from '@/shared/resource/meeple-occupation';
import styled from '@emotion/styled';
import { produce } from 'immer';
import { ActionContainer } from 'page-src/agricola/central-board/central-board.sub/action-board/shared/components/action-container';
import { JobCardModal } from 'page-src/agricola/player-board/player-board.sub/card/job-card-modal';
import { useCurrentPlayer } from 'page-src/agricola/shared/hooks/use-current-player';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

export const Tutoring4 = () => {
  const { currentPlayer, setPlayers, currentPlayerIndex, nextPlayer } = useCurrentPlayer();
  const [selectedPlayerNumber, setSelectedPlayerNumber] = useState<undefined | number>(undefined);
  const [usedPlayers, setUsedPlayers] = useState<number[]>([]); // 사용한 플레이어 번호
  const [jobOpen, setJobCard] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const round = useRecoilValue(roundState);
  const action = useRecoilValue(currentActionState);

  const isLessTwiceSelected =
    usedPlayers.filter(value => value === currentPlayer.number).length <= 2;

  // eslint-disable-next-line no-undef
  const handleClick = () => {
    if (action !== null) {
      alert(`[${currentPlayer.name}] 님의 액션을 완료해주세요.`);
      return;
    }

    if (selectedPlayerNumber !== undefined) return;

    if (currentPlayer.homeFarmer === 0) {
      alert('홈파머가 부족합니다.');
      return;
    }

    if (isLessTwiceSelected) {
      if (currentPlayer.food < 1) {
        alert('음식 1개가 필요합니다.');
        return;
      }
    } else {
      if (currentPlayer.food < 2) {
        alert('음식 2개가 필요합니다.');
        return;
      }
    }

    setSelectedPlayerNumber(currentPlayer.number);

    setJobCard(true);
  };

  useEffect(() => {
    setSelectedPlayerNumber(undefined);
  }, [round]);

  // 직업카드를 선택한 후엥 nextPlayer() 호출
  useEffect(() => {
    if (isDone) {
      // 두번째방문까지 토큰 하나이고 3번째부터 2개씩
      if (isLessTwiceSelected) {
        setPlayers(
          produce(_players => {
            _players[currentPlayerIndex].food -= 1;
            _players[currentPlayerIndex].homeFarmer -= 1;
          })
        );
      } else {
        setPlayers(
          produce(_players => {
            _players[currentPlayerIndex].homeFarmer -= 1;
            _players[currentPlayerIndex].food -= 2;
          })
        );
      }
      setUsedPlayers(prev => [...prev, currentPlayer.number]);

      nextPlayer();
      setIsDone(false);
    }
  }, [isDone]);

  return (
    <>
      <ActionContainer
        width={115}
        height={94}
        top={520}
        left={15}
        isActive
        title="교습"
        onClick={handleClick}
        userNumber={selectedPlayerNumber}
      >
        <ContentWrapper>
          <Wrapper>
            <Text>1</Text>
            <MeepleFood width={15} height={15} />
            <Text>내기</Text>
          </Wrapper>
          <Wrapper>
            <Text>1</Text>
            <MeepleOccupation width={30} height={25} />
          </Wrapper>
        </ContentWrapper>
      </ActionContainer>
      <JobCardModal
        open={jobOpen}
        setOpen={setJobCard}
        player={currentPlayer}
        setIsDone={setIsDone}
        isAction={true}
      />
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Text = styled.div`
  font-weight: bold;
  font-size: 14px;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
