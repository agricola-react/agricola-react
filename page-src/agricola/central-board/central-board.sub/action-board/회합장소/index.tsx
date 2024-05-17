import { MeepleFirst } from '@/shared/resource/meeple-first';
import { MeepleMinor } from '@/shared/resource/meeple-minor';
import styled from '@emotion/styled';
import { ActionContainer } from 'page-src/agricola/central-board/central-board.sub/action-board/shared/components/action-container';
import { useCurrentPlayer } from 'page-src/agricola/shared/hooks/use-current-player';
import { useEffect, useState } from 'react';
import { produce } from 'immer';
import { currentActionState, roundState } from '@/shared/recoil';
import { useRecoilValue } from 'recoil';
import { SubCardModal } from 'page-src/agricola/player-board/player-board.sub/card/sub-card-modal';

export const 회합장소 = () => {
  const { currentPlayer, setPlayers, currentPlayerIndex, nextPlayer } = useCurrentPlayer();
  const [selectedPlayerNumber, setSelectedPlayerNumber] = useState<undefined | number>(undefined);
  const round = useRecoilValue(roundState);
  const action = useRecoilValue(currentActionState);
  const [subCardOpen, setSubCardOpen] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleClick = () => {
    if (action !== null) {
      alert(`[${currentPlayer.name}] 님의 액션을 완료해주세요.`);
      return;
    }

    if (selectedPlayerNumber !== undefined) {
      alert('이미 선택한 플레이어입니다!!');
      return;
    }

    if (currentPlayer.homeFarmer === 0) {
      alert('홈파머가 부족합니다.');
      return;
    }

    setSelectedPlayerNumber(currentPlayer.number);
    setSubCardOpen(true);
  };

  useEffect(() => {
    setSelectedPlayerNumber(undefined);
  }, [round]);

  // 보조카드를 선택한 후엥 nextPlayer() 호출
  useEffect(() => {
    if (isDone) {
      setPlayers(players =>
        players.map((player, index) => ({ ...player, isFirst: index === currentPlayerIndex }))
      );

      setPlayers(
        produce(_players => {
          _players[currentPlayerIndex].homeFarmer -= 1;
        })
      );

      nextPlayer();
      setIsDone(false);
    }
  }, [isDone]);

  return (
    <>
      <ActionContainer
        width={115}
        height={72}
        top={134}
        left={31}
        isActive
        title="회합장소"
        onClick={handleClick}
        userNumber={selectedPlayerNumber}
      >
        <MeepleFirst width={10} height={20} />
        <Plus>+1</Plus>
        <MeepleMinor width={15} height={10} />
      </ActionContainer>
      <SubCardModal
        open={subCardOpen}
        setOpen={setSubCardOpen}
        player={currentPlayer}
        setIsDone={setIsDone}
        isAction={true}
      />
    </>
  );
};

const Plus = styled.div`
  font-weight: bold;
  font-size: 10px;
`;
