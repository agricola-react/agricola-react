import { Player, roundState } from '@/shared/recoil';
import { MeepleMajor } from '@/shared/resource/meeple-major';
import { MeepleMinor } from '@/shared/resource/meeple-minor';
import { MeepleUpgrade } from '@/shared/resource/meeple-upgrade';
import styled from '@emotion/styled';
import { ActionContainer } from 'page-src/agricola/central-board/central-board.sub/action-board/shared/components/action-container';
import { useCurrentPlayer } from 'page-src/agricola/shared/hooks/use-current-player';
import { useState, useEffect, useCallback } from 'react';
import { useRecoilValue } from 'recoil';

function validate(player: Player) {
  const roomCnt = player.slots.filter(slot => slot.type === '방').length;

  switch (player.roomType) {
    case 'stone':
      alert('돌 집은 더이상 업그레이드 할 수 없습니다.');
      return false;
    case 'clay':
      // TODO: 집 개조 조건
      return player.reed >= roomCnt && player.stone >= roomCnt;
    case 'wood':
      return player.reed >= roomCnt && player.clay >= roomCnt;
    default:
      return false;
  }
}

export const 집개조 = () => {
  const round = useRecoilValue(roundState);
  const [isActive, setIsActive] = useState(false);
  const { currentPlayer } = useCurrentPlayer();

  const handleClick = useCallback(() => {
    if (validate(currentPlayer)) {
      // TODO
      console.log('집 개조 실행');
      return;
    }
    alert('자원이 부족합니다.');
  }, [currentPlayer.slots]);

  useEffect(() => {
    if (round >= 7) {
      setIsActive(true);
    }
  }, [round]);

  return (
    <ActionContainer
      width={140}
      height={170}
      top={156}
      left={657}
      contentHeight={60}
      backNumber={2}
      isActive={isActive}
      title="집개조"
      onClick={handleClick}
    >
      <Wrapper>
        <MeepleUpgrade width={75} height={30} />
        <ContentWrapper>
          <div className="font-bold">▷</div>
          <div className="font-bold">1</div>
          <MeepleMajor width={30} height={20} />
          <div className="font-bold">/</div>
          <MeepleMinor width={30} height={20} />
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
