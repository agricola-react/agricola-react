import { currentActionState, roundState } from '@/shared/recoil';
import { MeeplePig } from '@/shared/resource/meeple-pig';
import styled from '@emotion/styled';
import { ActionContainer } from 'page-src/agricola/central-board/central-board.sub/action-board/shared/components/action-container';
import { useCurrentPlayer } from 'page-src/agricola/shared/hooks/use-current-player';
import { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { produce } from 'immer';

export const 돼지시장 = () => {
  const [isActive, setIsActive] = useState(false);
  const { currentPlayer, setPlayers, currentPlayerIndex, nextPlayer } = useCurrentPlayer();
  const [selectedPlayerNumber, setSelectedPlayerNumber] = useState<undefined | number>(undefined);
  const [currentPig, setCurrentPig] = useState(0);
  const round = useRecoilValue(roundState);
  const [action, setAction] = useRecoilState(currentActionState);

  const handleClick = () => {
    if (action !== null) {
      alert(`[${currentPlayer.name}] 님의 액션을 완료해주세요.`);
      return;
    }

    // 현재턴인 플레이어의 갈대 음식을 1 증가시킨다.(누적됨)
    if (isActive && selectedPlayerNumber === undefined && currentPlayer.homeFarmer > 0) {
      setPlayers(
        produce(_players => {
          _players[currentPlayerIndex].homeFarmer -= 1;
        })
      );
      setCurrentPig(0);
      setSelectedPlayerNumber(currentPlayer.number);
      setAction({
        type: '가축 추가',
        isDone: false,
        stockInfo: {
          count: currentPig,
          type: '돼지',
        },
      });
    }
  };

  useEffect(() => {
    if (action?.type === '가축 추가' && action.stockInfo?.type === '돼지' && action.isDone) {
      setAction(null);
      nextPlayer();
    }
  }, [action]);

  useEffect(() => {
    if (round >= 8) {
      setIsActive(true);
      setCurrentPig(prev => prev + 1);
      setSelectedPlayerNumber(undefined);
    }

    if (round === 14) {
      setCurrentPig(1);
    }
  }, [round]);

  return (
    <ActionContainer
      width={140}
      height={140}
      top={311}
      left={331}
      title="돼지시장"
      isActive={isActive}
      backNumber={3}
      onClick={handleClick}
      userNumber={selectedPlayerNumber}
    >
      <ContentWrapper>
        <Wrapper>
          <Text>1</Text>
          <MeeplePig width={30} height={25} />
        </Wrapper>
        <Wrapper>
          <div>누적 {currentPig}개</div>
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
