import { currentPlayerIndexState, playersState, roundState } from '@/shared/recoil';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

export const useCurrentPlayer = () => {
  const [players, setPlayers] = useRecoilState(playersState);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useRecoilState(currentPlayerIndexState);
  const round = useRecoilValue(roundState);

  const currentPlayer = players[currentPlayerIndex];

  // 다음 유효한 플레이어로 이동하는 함수
  const nextPlayer = () => {
    let nextIndex = currentPlayerIndex;

    do {
      nextIndex = (nextIndex + 1) % players.length;
    } while (players[nextIndex].homeFarmer === 0 && nextIndex !== currentPlayerIndex);

    console.log(`[useCurrentPlayer] nextIndex: ${nextIndex}`);
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

  // 라운드 시작 시 첫 플레이어로 설정
  useEffect(() => {
    const firstPlayerIndex = players.findIndex(player => player.isFirst);
    setCurrentPlayerIndex(firstPlayerIndex);
  }, [round]);

  return {
    currentPlayer,
    setPlayers,
    currentPlayerIndex,
    nextPlayer,
  };
};
