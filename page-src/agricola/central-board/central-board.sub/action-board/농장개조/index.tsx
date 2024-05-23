import { Player, roundState } from '@/shared/recoil';
import { Arrow } from '@/shared/resource/arrow';
import { MeepleFence } from '@/shared/resource/meeple-fence';
import { MeepleUpgrade } from '@/shared/resource/meeple-upgrade';
import { Wood } from '@/shared/resource/wood';
import styled from '@emotion/styled';
import { produce } from 'immer';
import { ActionContainer } from 'page-src/agricola/central-board/central-board.sub/action-board/shared/components/action-container';
import { useCurrentPlayer } from 'page-src/agricola/shared/hooks/use-current-player';
import { useState, useEffect, useCallback } from 'react';
import { useRecoilValue } from 'recoil';

export const 농장개조 = () => {
  const [isActive, setIsActive] = useState(false);

  const { currentPlayer, setPlayers, currentPlayerIndex, nextPlayer } = useCurrentPlayer();
  const [selectedPlayerNumber, setSelectedPlayerNumber] = useState<undefined | number>();
  const round = useRecoilValue(roundState);

  const [isDone, setIsDone] = useState(false);

  const validate = useCallback(
    (player: Player, roomCnt: number) => {
      switch (player.roomType) {
        case 'stone':
          alert('돌 집은 더이상 업그레이드 할 수 없습니다.');
          return false;
        case 'clay':
          if (player.reed >= roomCnt && player.stone >= roomCnt) {
            setPlayers(
              produce(_players => {
                _players[currentPlayerIndex].roomType = 'stone';
              })
            );
            return true;
          }
          return false;
        case 'wood':
          if (player.reed >= roomCnt && player.clay >= roomCnt) {
            setPlayers(
              produce(_players => {
                _players[currentPlayerIndex].roomType = 'clay';
              })
            );
            return true;
          }
          return false;
        default:
          return false;
      }
    },
    [currentPlayer]
  );

  const handleClick = useCallback(() => {
    if (selectedPlayerNumber !== undefined) return;

    const roomCnt = currentPlayer.slots.filter(slot => slot.type === '방').length;

    if (validate(currentPlayer, roomCnt)) {
      setPlayers(
        produce(_players => {
          _players[currentPlayerIndex].homeFarmer -= 1;
          _players[currentPlayerIndex].reed -= roomCnt;
          _players[currentPlayerIndex][_players[currentPlayerIndex].roomType] -= roomCnt;
        })
      );
      setSelectedPlayerNumber(currentPlayer.number);
      // 울타리로직 추가
      const 사용할울타리갯수 = Number(prompt(`몇개로 울타리 사용하시겠습니까?`));
      console.log(사용할울타리갯수);
      return;
    }
    alert('자원이 부족합니다.');
  }, [currentPlayer, selectedPlayerNumber]);

  useEffect(() => {
    if (isDone) {
      nextPlayer();
      setIsDone(false);
    }
  }, [isDone]);

  useEffect(() => {
    if (round >= 14) {
      setIsActive(true);
    }
    setSelectedPlayerNumber(undefined);
  }, [round]);
  return (
    <ActionContainer
      width={140}
      height={170}
      top={626}
      left={489}
      contentHeight={60}
      backNumber={6}
      isActive={isActive}
      title="농장개조"
      onClick={handleClick}
      userNumber={selectedPlayerNumber}
    >
      <Wrapper>
        <MeepleUpgrade width={75} height={30} />
        <ContentWrapper>
          <div className="font-bold">▷</div>
          <div className="font-bold">1</div>
          <Wood width={15} height={17} />
          <Arrow width={13} height={13} />
          <MeepleFence width={20} height={20} />
        </ContentWrapper>
      </Wrapper>
    </ActionContainer>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;
