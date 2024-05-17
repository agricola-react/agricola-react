/* eslint-disable no-unused-vars */
import { ModalContainer } from '@/shared/components/modal-container';
import { CardType, Player, playersState, remainMainCardsState } from '@/shared/recoil';
import styled from '@emotion/styled';
import { produce } from 'immer';
import { useRecoilState, useSetRecoilState } from 'recoil';

type Props = {
  player: Player;
  open: boolean;
  setOpen: (open: boolean) => void;
  isAction: boolean;
  setIsDone?: (isDone: boolean) => void;
  mainCards: CardType[];
};

export const MainCardModal = ({ mainCards, player, open, setOpen, isAction, setIsDone }: Props) => {
  const [remainMainCards, setRemainMainCards] = useRecoilState(remainMainCardsState);
  const setPlayers = useSetRecoilState(playersState);

  return (
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
      <ModalWrapper>
        {mainCards.map(main => (
          <div
            key={main.name}
            className="flex flex-col items-center cursor-pointer w-40 h-72"
            onClick={() => {
              if (!isAction) {
                alert('액션칸에서만 활성화 가능합니다.');
                return;
              }

              setPlayers(
                produce(_players => {
                  _players[player.number - 1].mainCards = [
                    ..._players[player.number - 1].mainCards,
                    {
                      name: main.name,
                      src: main.src,
                      isActive: true,
                    },
                  ];
                })
              );

              setRemainMainCards(remainMainCards.filter(card => card.name !== main.name));

              alert(`${main.name}이 활성화되었습니다.`);
              setOpen(false);
              if (setIsDone) {
                setIsDone(true);
              }
            }}
          >
            <img key={main.name} src={main.src} alt={main.name} className="rounded-[10px]" />
          </div>
        ))}
      </ModalWrapper>
    </ModalContainer>
  );
};

const ModalWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
`;
