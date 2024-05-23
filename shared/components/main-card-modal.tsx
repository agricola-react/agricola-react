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

const demoActiveCardNames = ['가구제작소', '돌가마', '바구니제작소', '흙가마'];

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

              if (!demoActiveCardNames.includes(main.name)) {
                alert('데모버전에선 지원하지 않습니다! 곧 찾아뵐게요!');
                return;
              }

              if (main.name === '가구제작소') {
                if (player.wood < 2 || player.stone < 2) {
                  alert('나무2개 돌2개가 필요합니다.');
                  return;
                }
                setPlayers(
                  produce(_players => {
                    _players[player.number - 1].wood -= 2;
                    _players[player.number - 1].stone -= 2;
                  })
                );
              }

              if (main.name === '가구제작소') {
                if (player.clay < 2 || player.stone < 2) {
                  alert('흙2개 돌2개가 필요합니다.');
                  return;
                }
                setPlayers(
                  produce(_players => {
                    _players[player.number - 1].clay -= 2;
                    _players[player.number - 1].stone -= 2;
                  })
                );
              }

              if (main.name === '돌가마') {
                if (player.clay < 1 || player.stone < 3) {
                  alert('흙1개 돌3개가 필요합니다.');
                  return;
                }
                setPlayers(
                  produce(_players => {
                    _players[player.number - 1].clay -= 1;
                    _players[player.number - 1].stone -= 3;
                  })
                );
              }

              if (main.name === '바구니제작소') {
                if (player.reed < 2 || player.stone < 2) {
                  alert('갈대2개 돌2개가 필요합니다.');
                  return;
                }
                setPlayers(
                  produce(_players => {
                    _players[player.number - 1].reed -= 2;
                    _players[player.number - 1].stone -= 2;
                  })
                );
              }

              if (main.name === '흙가마') {
                if (player.clay < 3 || player.stone < 1) {
                  alert('흙2개 돌1개가 필요합니다.');
                  return;
                }
                setPlayers(
                  produce(_players => {
                    _players[player.number - 1].clay -= 3;
                    _players[player.number - 1].stone -= 1;
                  })
                );
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
