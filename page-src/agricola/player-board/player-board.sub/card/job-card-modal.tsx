/* eslint-disable no-unused-vars */
import { ModalContainer } from '@/shared/components/modal-container';
import { Player, currentPlayerIndexState, playersState } from '@/shared/recoil';
import styled from '@emotion/styled';
import { produce } from 'immer';
import { useSetRecoilState } from 'recoil';
import { useCurrentPlayer } from './../../../shared/hooks/use-current-player';

type Props = {
  player: Player;
  open: boolean;
  setOpen: (open: boolean) => void;
  isAction: boolean;
  setIsDone?: (isDone: boolean) => void;
};

export const JobCardModal = ({ player, open, setOpen, isAction, setIsDone }: Props) => {
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
        {player.jobCards.map(job => (
          <div
            key={job.name}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => {
              if (!isAction) {
                alert('액션칸에서만 활성화 가능합니다.');
                return;
              }

              if (job.isActive) {
                alert('이미 활성화된 카드입니다.');
                return;
              }

              const 지붕다지는사람확인 = player.jobCards.find(
                jobcard => jobcard.name === '지붕다지는사람'
              );
              const 방개수 = player.slots.filter(slot => slot.type === '방').length;
              let 지붕음식 = 0;
              let 지붕돌 = 0;
              if (지붕다지는사람확인) {
                console.log(1);
                if (player.food < 방개수) {
                  return alert('음식이 부족합니다.');
                }
                const 지붕다지는사람사용여부 = confirm('지붕다지는 사람 효과를 사용할건가요?');
                if (지붕다지는사람사용여부) {
                  지붕음식 -= 방개수;
                  지붕돌 += 방개수;
                }
              }
              // 직업카드이미지 클릭 시 해당 직업카드가 isActive되는 부분을 찾아서 위 if(지붕다지는사람사용여부)를 사용해라
              setPlayers(
                produce(_players => {
                  _players[player.number - 1].jobCards = _players[player.number - 1].jobCards.map(
                    _job => ({
                      ..._job,
                      isActive: _job.name === job.name ? true : _job.isActive,
                    })
                  );
                  _players[player.number - 1].food -= 지붕음식;
                  _players[player.number - 1].stone += 지붕돌;
                })
              );
              alert(`${job.name}이 활성화되었습니다.`);
              setOpen(false);
              if (setIsDone) {
                setIsDone(true);
              }
            }}
          >
            <img key={job.name} src={job.src} alt={job.name} className="rounded-[10px]  h-72" />
            {job.isActive && <div className="mt-[20px] font-bold">활성화</div>}
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
