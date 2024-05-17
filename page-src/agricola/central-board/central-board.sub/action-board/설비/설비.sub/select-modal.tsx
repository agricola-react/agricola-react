/* eslint-disable no-unused-vars */
import { MainCardModal } from '@/shared/components/main-card-modal';
import { ModalContainer } from '@/shared/components/modal-container';
import { remainMainCardsState } from '@/shared/recoil';
import styled from '@emotion/styled';
import { JobCardModal } from 'page-src/agricola/player-board/player-board.sub/card/job-card-modal';
import { SubCardModal } from 'page-src/agricola/player-board/player-board.sub/card/sub-card-modal';
import { useCurrentPlayer } from 'page-src/agricola/shared/hooks/use-current-player';
import { use, useState } from 'react';
import { useRecoilValue } from 'recoil';

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  setIsDone?: (isDone: boolean) => void;
};
export const SelectModal = ({ open, setOpen, setIsDone }: Props) => {
  const { currentPlayer } = useCurrentPlayer();
  const [openMainCard, setOpenMainCard] = useState(false);
  const [openSubCard, setOpenSubCard] = useState(false);
  const remainMainCards = useRecoilValue(remainMainCardsState);

  return (
    <>
      <ModalContainer
        open={open}
        setOpen={setOpen}
        style={{
          backgroundColor: '#dfc165',
          border: '1px solid #624603',
          borderRadius: '10px',
          boxShadow: '2px 2px 5px #000',
        }}
      >
        <div>
          <div>무엇을 선택하시겠습니까?</div>
          <div className="flex">
            <CardContainer
              bgColor="red"
              onClick={() => {
                setOpenMainCard(true);
                setOpen(false);
              }}
            >
              <img className="w-16 mt-3" src="/main-card/주요설비.jpg" alt="" />
              <div className="font-bold">주요설비</div>
            </CardContainer>
            <CardContainer
              bgColor="orange"
              onClick={() => {
                setOpenSubCard(true);
                setOpen(false);
              }}
            >
              <img className="w-16 mt-3" src="/sub-card/보조카드.jpg" alt="" />
              <div className="font-bold">보조설비</div>
            </CardContainer>
          </div>
        </div>
      </ModalContainer>
      <MainCardModal
        open={openMainCard}
        setOpen={setOpenMainCard}
        player={currentPlayer}
        setIsDone={setIsDone}
        isAction={true}
        mainCards={remainMainCards}
      />
      <SubCardModal
        open={openSubCard}
        setOpen={setOpenSubCard}
        player={currentPlayer}
        isAction={true}
        setIsDone={setIsDone}
      />
    </>
  );
};

const CardContainer = styled.div<{ bgColor: string }>`
  &:hover {
    background-color: ${props => props.bgColor};
  }
  cursor: pointer;
  width: 5rem; /* Tailwind w-20 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 8rem; /* Tailwind h-32 */
`;
