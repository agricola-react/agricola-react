import { currentActionState, roundState } from '@/shared/recoil';
import { Wood } from '@/shared/resource/wood';
import styled from '@emotion/styled';
import { produce } from 'immer';
import { ActionContainer } from 'page-src/agricola/central-board/central-board.sub/action-board/shared/components/action-container';
import { useCurrentPlayer } from 'page-src/agricola/shared/hooks/use-current-player';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

export const Bush = () => {
  const { currentPlayer, setPlayers, currentPlayerIndex, nextPlayer } = useCurrentPlayer();
  const [selectedPlayerNumber, setSelectedPlayerNumber] = useState<undefined | number>(undefined);
  const [currentWood, setCurrentWood] = useState(0);
  const round = useRecoilValue(roundState);
  const action = useRecoilValue(currentActionState);

  const handleClick = () => {
    if (action !== null) {
      alert(`[${currentPlayer.name}] 님의 액션을 완료해주세요.`);
      return;
    }
    const 버섯따는사람인경우 = currentPlayer.jobCards.find(
      job => job.name === '버섯따는사람' && job.isActive
    );

    const 나무꾼소유여부 = currentPlayer.jobCards.find(
      card => card.name === '나무꾼' && card.isActive
    );

    if (나무꾼소유여부) {
      alert('나무꾼카드가 발동하여 나무 +1 됩니다.');
    }

    if (버섯따는사람인경우) {
      const 버섯따는사람효과를사용했는지 = confirm(
        '나무 누적 칸을 이용할때 나무 1개를 그 칸에 남겨 놓고 음식 2개를 대신 가져오시겠습니까?'
      );

      if (버섯따는사람효과를사용했는지) {
        setPlayers(
          produce(_players => {
            _players[currentPlayerIndex].wood += currentWood - 1;
            _players[currentPlayerIndex].food += 2;
            _players[currentPlayerIndex].homeFarmer -= 1;
          })
        );
        setCurrentWood(1);
      } else {
        setPlayers(
          produce(_players => {
            _players[currentPlayerIndex].wood += currentWood;
            _players[currentPlayerIndex].homeFarmer -= 1;
          })
        );
        setCurrentWood(0);
      }
    } else if (나무꾼소유여부) {
      setPlayers(
        produce(_players => {
          _players[currentPlayerIndex].wood += 나무꾼소유여부 ? 1 + currentWood : currentWood;
          _players[currentPlayerIndex].homeFarmer -= 1;
        })
      );
      setCurrentWood(0);
    } else {
      setPlayers(
        produce(_players => {
          _players[currentPlayerIndex].wood += currentWood;
          _players[currentPlayerIndex].homeFarmer -= 1;
        })
      );
      setCurrentWood(0);
    }

    setSelectedPlayerNumber(currentPlayer.number);
    nextPlayer();
  };

  useEffect(() => {
    setCurrentWood(prev => prev + 1);
    setSelectedPlayerNumber(undefined);

    if (round === 9) {
      setCurrentWood(5);
    }
  }, [round]);

  return (
    <ActionContainer
      top={120}
      left={15}
      width={140}
      height={86}
      isActive
      title="덤불"
      onClick={handleClick}
      userNumber={selectedPlayerNumber}
    >
      <ContentWrapper>
        <Wrapper>
          <Text>1</Text>
          <Wood width={15} height={17} />
        </Wrapper>
        <Wrapper>
          <div>누적 {currentWood}개</div>
        </Wrapper>
      </ContentWrapper>
    </ActionContainer>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Text = styled.div`
  font-weight: bold;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
