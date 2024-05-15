import { currentPlayerIndexState, playersState } from '@/shared/recoil';
import { useRecoilState } from 'recoil';

export const useCurrentPlayer = () => {
  const [players, setPlayers] = useRecoilState(playersState);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useRecoilState(currentPlayerIndexState);

  const currentPlayer = players[currentPlayerIndex];

  // 다음 유효한 플레이어로 이동하는 함수
  const nextPlayer = () => {
    let nextIndex = currentPlayerIndex;

    do {
      nextIndex = (nextIndex + 1) % players.length;
    } while (players[nextIndex].homeFarmer === 0 && nextIndex !== currentPlayerIndex);

    setCurrentPlayerIndex(nextIndex);

    // 라운드 완료 여부 확인
    checkRoundCompletion();
  };

  // 라운드 완료 여부 확인 및 처리
  const checkRoundCompletion = () => {
    const allUsedUp = players.every(player => player.homeFarmer === 0);
    if (allUsedUp) {
      setPlayers(players.map(player => ({ ...player, homeFarmer: player.farmer })));
    }
  };

  return {
    currentPlayer,
    setPlayers,
    currentPlayerIndex,
    nextPlayer,
  };
};
