/* eslint-disable no-unused-vars */
import { ModalContainer } from '@/shared/components/modal-container';
import { Player, playersState } from '@/shared/recoil';
import styled from '@emotion/styled';
import { produce } from 'immer';
import { useSetRecoilState } from 'recoil';

type Props = {
  player: Player;
  open: boolean;
  setOpen: (open: boolean) => void;
  isAction: boolean;
  setIsDone?: (isDone: boolean) => void;
};

const demoActiveCardNames = ['곡식용삽', '돌집게', '물통', '병', '부엌방', '통나무배'];

export const SubCardModal = ({ player, open, setOpen, isAction, setIsDone }: Props) => {
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
        {player.subCards.map(sub => (
          <div
            key={sub.name}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => {
              if (!isAction) {
                alert('액션칸에서만 활성화 가능합니다.');
                return;
              }

              if (sub.isActive) {
                alert('이미 활성화된 카드입니다.');
                return;
              }

              if (!demoActiveCardNames.includes(sub.name)) {
                alert('데모버전에선 지원하지 않습니다! 곧 찾아뵐게요!');
                return;
              }

              if (sub.name === '곡식용삽' || sub.name === '돌집게') {
                if (player.wood < 1) {
                  alert('나무기 부족합니다.');
                  return;
                }

                setPlayers(
                  produce(_players => {
                    _players[player.number - 1].wood -= 1;
                  })
                );
              }

              if (sub.name === '물통') {
                if (player.clay < 1) {
                  alert('흙이 부족합니다.');
                  return;
                }

                setPlayers(
                  produce(_players => {
                    _players[player.number - 1].clay -= 1;
                  })
                );
              }

              if (sub.name === '병') {
                const farmersCount = player.farmer;

                if (player.clay < farmersCount || player.food < farmersCount) {
                  alert('흙이나 음식이 부족합니다.');
                  return;
                }

                setPlayers(
                  produce(_players => {
                    _players[player.number - 1].clay -= farmersCount;
                    _players[player.number - 1].food -= farmersCount;
                  })
                );
              }

              // 요거는 없앨까 고민중,,
              if (sub.name === '부엌방') {
                if (player.wood < 1 || player.clay < 1) {
                  alert('나무나 흙이 부족합니다.');
                  return;
                }

                setPlayers(
                  produce(_players => {
                    _players[player.number - 1].wood -= 1;
                    _players[player.number - 1].clay -= 1;
                  })
                );
              }

              if (sub.name === '통나무배') {
                if (player.wood < 2) {
                  alert('나무기 부족합니다.');
                  return;
                }

                if (player.jobCards.filter(value => value.isActive).length === 1) {
                  alert('직업카드가 1개일때만 가능합니다.');
                  return;
                }

                setPlayers(
                  produce(_players => {
                    _players[player.number - 1].wood -= 2;
                  })
                );
              }

              // 보조설비 활성화 로직
              setPlayers(
                produce(_players => {
                  _players[player.number - 1].subCards = _players[player.number - 1].subCards.map(
                    _sub => ({
                      ..._sub,
                      isActive: _sub.name === sub.name ? true : _sub.isActive,
                    })
                  );
                })
              );
              alert(`${sub.name}이 활성화되었습니다.`);
              setOpen(false);
              if (setIsDone) {
                setIsDone(true);
              }
            }}
          >
            <img key={sub.name} src={sub.src} alt={sub.name} className="rounded-[10px] w-64 h-96" />
            {sub.isActive && <div className="mt-[20px] font-bold">활성화</div>}
          </div>
        ))}
      </ModalWrapper>
    </ModalContainer>
  );
};

const ModalWrapper = styled.div`
  display: flex;
  gap: 20px;
`;
