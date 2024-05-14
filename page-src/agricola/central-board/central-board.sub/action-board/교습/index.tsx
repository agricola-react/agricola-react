import { currentActionState, roundState } from '@/shared/recoil';
import { MeepleFood } from '@/shared/resource/meeple-food';
import { MeepleOccupation } from '@/shared/resource/meeple-occupation';
import styled from '@emotion/styled';
import { produce } from 'immer';
import { ActionContainer } from 'page-src/agricola/central-board/central-board.sub/action-board/shared/components/action-container';
import { useCurrentPlayer } from 'page-src/agricola/shared/hooks/use-current-player';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import * as Dialog from '@radix-ui/react-dialog';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Cross1Icon } from '@radix-ui/react-icons';

// TODO: 직업카드 작업해야함
export const 교습 = () => {
  const { currentPlayer, setPlayers, currentPlayerIndex, nextPlayer } = useCurrentPlayer();
  const [selectedPlayerNumber, setSelectedPlayerNumber] = useState<undefined | number>(undefined);
  const [usedPlayers, setUsedPlayers] = useState<number[]>([]); // 사용한 플레이어 번호
  const [jobOpen, setJobCard] = useState(false);
  const round = useRecoilValue(roundState);
  const action = useRecoilValue(currentActionState);

  const handleClick = () => {
    if (action !== null) {
      alert(`[${currentPlayer.name}] 님의 액션을 완료해주세요.`);
      return;
    }
    // 처음사용하면 토큰무료, 그 다음부턴 1토큰
    if (selectedPlayerNumber === undefined && currentPlayer.homeFarmer > 0) {
      // 이미 사용했던 유저라면
      // 사용된 유저가 현재유저의 번호를 포함하는지 판별
      if (usedPlayers.includes(currentPlayer.number)) {
        if (currentPlayer.food >= 1) {
          setPlayers(
            produce(_players => {
              _players[currentPlayerIndex].food -= 1;
              _players[currentPlayerIndex].homeFarmer -= 1;
            })
          );
        } else {
          alert('음식이 부족합니다.');
          return;
        }
      } else {
        setPlayers(
          produce(_players => {
            _players[currentPlayerIndex].homeFarmer -= 1;
          })
        );
        setUsedPlayers(prev => [...prev, currentPlayer.number]);
      }

      setSelectedPlayerNumber(currentPlayer.number);
      setJobCard(jobOpen => !jobOpen);
      nextPlayer();
    }
  };

  useEffect(() => {
    setSelectedPlayerNumber(undefined);
  }, [round]);

  return (
    <Dialog.Root open={jobOpen}>
      <Dialog.Trigger>
        <ActionContainer
          width={115}
          height={94}
          top={406}
          left={30}
          isActive
          title="교습"
          onClick={handleClick}
          userNumber={selectedPlayerNumber}
        >
          <ContentWrapper>
            <Wrapper>
              <Text>1</Text>
              <MeepleFood width={15} height={15} />
              <Text>내기</Text>
            </Wrapper>
            <Wrapper>
              <Text>1</Text>
              <MeepleOccupation width={30} height={25} />
            </Wrapper>
          </ContentWrapper>
        </ActionContainer>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay">
          <Dialog.Content className="DialogContent">
            <div className="flex w-full justify-end ">
              <DialogPrimitive.Close
                aria-label="Close"
                className="w-7 h-7 bg-red-400 justify-center flex items-center rounded-lg"
                onClick={() => {
                  setJobCard(false);
                }}
              >
                <Cross1Icon />
              </DialogPrimitive.Close>
            </div>
            <div className="flex">
              {currentPlayer.jobCards.map(job => (
                <img key={job.name} src={job.src} alt={job.name} />
              ))}
            </div>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Text = styled.div`
  font-weight: bold;
  font-size: 14px;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
