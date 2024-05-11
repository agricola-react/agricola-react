import { MeepleFirst } from '@/shared/resource/meeple-first';
import { MeepleMinor } from '@/shared/resource/meeple-minor';
import styled from '@emotion/styled';
import { ActionContainer } from 'page-src/agricola/central-board/central-board.sub/action-board/shared/components/action-container';
import { useCurrentPlayer } from 'page-src/agricola/shared/hooks/use-current-player';
import { useEffect, useState } from 'react';
import { produce } from 'immer';
import { currentActionState, roundState } from '@/shared/recoil';
import { useRecoilValue } from 'recoil';

// TODO: 보조설비 작업 필요
export const 회합장소 = () => {
  const { currentPlayer, setPlayers, currentPlayerIndex, nextPlayer } = useCurrentPlayer();
  const [selectedPlayerNumber, setSelectedPlayerNumber] = useState<undefined | number>(undefined);
  const round = useRecoilValue(roundState);
  const action = useRecoilValue(currentActionState);

  const handleClick = () => {
    if (action !== null) {
      alert(`[${currentPlayer.name}] 님의 액션을 완료해주세요.`);
      return;
    }

    // 현재턴인 플레이어의 갈대 자원을 3 증가시킨다.(누적됨)
    if (selectedPlayerNumber === undefined && currentPlayer.homeFarmer > 0) {
      setPlayers(players =>
        players.map((player, index) => ({ ...player, isFirst: index === currentPlayerIndex }))
      );
      setPlayers(
        produce(_players => {
          _players[currentPlayerIndex].homeFarmer -= 1;
        })
      );

      setSelectedPlayerNumber(currentPlayer.number);
      nextPlayer();
    }
  };

  useEffect(() => {
    setSelectedPlayerNumber(undefined);
  }, [round]);

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
    </>
  );
};

const Plus = styled.div`
  font-weight: bold;
  font-size: 10px;
`;
