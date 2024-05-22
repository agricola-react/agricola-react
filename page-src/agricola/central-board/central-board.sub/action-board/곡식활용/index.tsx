import { currentActionState, currentRoundNameState, roundState } from '@/shared/recoil';
import { MeepleBread } from '@/shared/resource/meeple-bread';
import { MeepleSow } from '@/shared/resource/meeple-sow';
import styled from '@emotion/styled';
import { produce } from 'immer';
import { ActionContainer } from 'page-src/agricola/central-board/central-board.sub/action-board/shared/components/action-container';
import { useCurrentPlayer } from 'page-src/agricola/shared/hooks/use-current-player';
import { isExistAtLeastOne } from 'page-src/agricola/shared/utils/is-exist-at-least-one';
import { isExistEmptyField } from 'page-src/agricola/shared/utils/is-exist-empty-field';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

export const 곡식활용 = () => {
  const round = useRecoilValue(roundState);
  const [isActive, setIsActive] = useState(false);

  const [action, setAction] = useRecoilState(currentActionState);
  const { currentPlayer, setPlayers, nextPlayer } = useCurrentPlayer();
  const [selectedPlayerNumber, setSelectedPlayerNumber] = useState<undefined | number>();
  const [currentRoundName, setCurrentRoundName] = useRecoilState(currentRoundNameState);

  const handleClick = () => {
    if (action !== null) {
      alert(`[${currentPlayer.name}] 님의 액션을 완료해주세요.`);
      return;
    }

    if (selectedPlayerNumber !== undefined) return;

    setCurrentRoundName('곡식활용');

    const 곡식활용하는지 = confirm(`[곡식활용] 곡식활용을 하시겠습니까?`);

    if (곡식활용하는지) {
      let isValid = true;
      if (!isExistAtLeastOne(currentPlayer.slots, '밭')) {
        alert(`[곡식활용] 씨앗을 뿌리기 위해서는 농지가 필요합니다.`);
        isValid = false;
      }

      if (currentPlayer.grain === 0 && currentPlayer.vegetable === 0) {
        alert(`[곡식활용] 곡식 혹은 채소가 적어도 하나는 있어야 합니다.`);
        isValid = false;
      }

      if (!isExistEmptyField(currentPlayer.slots)) {
        alert(`[곡식활용] 비어있는 농지가 없습니다.`);
        isValid = false;
      }

      if (isValid) {
        setAction({ type: '씨뿌리기', isDone: false });
        setSelectedPlayerNumber(currentPlayer.number);
      }
    }
  };

  useEffect(() => {
    if (round >= 1) {
      setIsActive(true);
    }
    setSelectedPlayerNumber(undefined);
  }, [round]);

  useEffect(() => {
    if (action?.type === '씨뿌리기' && action.isDone && currentRoundName === '곡식활용') {
      setAction({ type: '빵굽기', isDone: false });
    }

    if (action?.type === '빵굽기') {
      const 돌가마인지 = currentPlayer.mainCards.find(card => card.name === '돌가마');
      const 흙가마인지 = currentPlayer.mainCards.find(card => card.name === '흙가마');

      if (돌가마인지) {
        const grainNumber = Number(prompt('곡식 몇개를 사용하시겠습니까?(2개당 음식 4개)'));

        if (grainNumber > currentPlayer.grain) {
          alert('곡식이 부족합니다.');
          return;
        }

        setPlayers(
          produce(_players => {
            _players[currentPlayer.number - 1].food += grainNumber * 2;
            _players[currentPlayer.number - 1].grain -= grainNumber;
          })
        );
      } else if (흙가마인지) {
        const grainNumber = Number(prompt('곡식 몇개를 사용하시겠습니까?(1개당 음식 5개)'));

        if (grainNumber > currentPlayer.grain) {
          alert('곡식이 부족합니다.');
          return;
        }

        setPlayers(
          produce(_players => {
            _players[currentPlayer.number - 1].food += grainNumber * 5;
            _players[currentPlayer.number - 1].grain -= grainNumber;
          })
        );
      }

      setPlayers(
        produce(_players => {
          _players[currentPlayer.number - 1].homeFarmer -= 1;
        })
      );

      setAction(null);
      nextPlayer();
    }
  }, [action]);

  return (
    <ActionContainer
      width={140}
      height={140}
      top={2}
      left={167}
      backNumber={1}
      isActive={isActive}
      title="곡식활용"
      onClick={handleClick}
      userNumber={selectedPlayerNumber}
    >
      <ContentWrapper>
        <Wrapper>
          <ContentWrapper>
            <MeepleSow width={35} height={30} />
            <div className="font-bold">+</div>
            <MeepleBread width={30} height={20} />
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

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;
