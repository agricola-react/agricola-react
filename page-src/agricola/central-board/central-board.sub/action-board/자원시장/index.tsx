import { currentActionState, roundState } from '@/shared/recoil';
import { MeepleFood } from '@/shared/resource/meeple-food';
import { Reed } from '@/shared/resource/reed';
import { Stone } from '@/shared/resource/stone';
import styled from '@emotion/styled';
import { produce } from 'immer';
import { ActionContainer } from 'page-src/agricola/central-board/central-board.sub/action-board/shared/components/action-container';
import { useCurrentPlayer } from 'page-src/agricola/shared/hooks/use-current-player';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

export const ResourceMarket = () => {
  const { currentPlayer, setPlayers, currentPlayerIndex, nextPlayer } = useCurrentPlayer();
  const [selectedPlayerNumber, setSelectedPlayerNumber] = useState<undefined | number>(undefined);
  const round = useRecoilValue(roundState);
  const action = useRecoilValue(currentActionState);

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

    const 창고관리인소유여부 = currentPlayer.jobCards.find(
      job => job.name === '창고관리인' && job.isActive
    );

    if (selectedPlayerNumber === undefined && currentPlayer.homeFarmer > 0) {
      setPlayers(
        produce(_players => {
          _players[currentPlayerIndex].food += 1;
          _players[currentPlayerIndex].stone += 1;
          _players[currentPlayerIndex].reed += 1;
          let 선택한자원 = null;
          if (창고관리인소유여부) {
            const 선택 = confirm(
              '창고관리인카드가 발동하여 흙 1개 추가로 가져오시겠습니까?(취소 버튼 시 곡식 1개를 가져옵니다.)'
            );
            선택한자원 = 선택 ? 'clay' : 'grain';
            _players[currentPlayerIndex].clay += 선택한자원 === 'clay' ? 1 : 0;
            _players[currentPlayerIndex].grain += 선택한자원 === 'grain' ? 1 : 0;
          }

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
        width={200}
        height={150}
        top={320}
        left={15}
        isActive
        title="자원시장"
        onClick={handleClick}
        userNumber={selectedPlayerNumber}
      >
        <ContentWrapper>
          <Description>+1</Description>
          <Reed width={15} height={15} />
          <Description>+1</Description>
          <Stone width={15} height={15} />
          <Description>+1</Description>
          <MeepleFood width={15} height={15} />
        </ContentWrapper>
      </ActionContainer>
    </>
  );
};

const ContentWrapper = styled.div`
  align-items: center;
  display: flex;
  gap: 10px;
  height: 100%;
  justify-content: center;
  width: 100%;
`;

const Description = styled.div`
  font-weight: bold;
`;
