import { currentActionState, roundState } from '@/shared/recoil';
import { Arrow } from '@/shared/resource/arrow';
import { MeepleFence } from '@/shared/resource/meeple-fence';
import { Wood } from '@/shared/resource/wood';
import styled from '@emotion/styled';
import { produce } from 'immer';
import { ActionContainer } from 'page-src/agricola/central-board/central-board.sub/action-board/shared/components/action-container';
import { useCurrentPlayer } from 'page-src/agricola/shared/hooks/use-current-player';
import { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

export const 울타리 = () => {
  const { currentPlayer, setPlayers, nextPlayer } = useCurrentPlayer();
  const [selectedPlayerNumber, setSelectedPlayerNumber] = useState<undefined | number>();
  const [action, setAction] = useRecoilState(currentActionState);
  const round = useRecoilValue(roundState);

  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    if (action !== null) {
      alert(`[${currentPlayer.name}] 님의 액션을 완료해주세요.`);
      return;
    }
    if (selectedPlayerNumber !== undefined) return;
    setSelectedPlayerNumber(currentPlayer.number);

    setAction({
      type: '울타리 설치',
      isDone: false,
    });

    setPlayers(
      produce(_players => {
        _players[currentPlayer.number - 1].homeFarmer -= 1;
      })
    );
  };

  useEffect(() => {
    if (action?.type === '울타리 설치' && action.isDone) {
      setAction(null);
      nextPlayer();
    }
  }, [action]);

  useEffect(() => {
    if (round >= 4) {
      setIsActive(true);
    }
    setSelectedPlayerNumber(undefined);
  }, [round]);

  return (
    <ActionContainer
      width={140}
      height={140}
      top={2}
      left={657}
      backNumber={1}
      isActive={isActive}
      title="울타리"
      onClick={handleClick}
      userNumber={selectedPlayerNumber}
    >
      <ContentWrapper>
        <Wrapper>
          <ContentWrapper>
            <Text>1</Text>
            <Wood width={15} height={17} />
            <Arrow width={13} height={13} />
            <MeepleFence width={20} height={20} />
          </ContentWrapper>
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
`;
