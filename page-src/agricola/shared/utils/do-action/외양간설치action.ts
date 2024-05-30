import { 외양간존재Alert, 외양간초과Alert } from '@/shared/constants/alert';
import { BARN, MAX_BARN } from '@/shared/constants/barn';
import { Player } from '@/shared/recoil';

export function 외양간설치action(player: Player, index: number): Player | null {
  if (player.slots[index].resource === '외양간') {
    alert(외양간존재Alert);
    return null;
  }

  if (player.wood < 5) {
    alert(`자원이 부족합니다.`);
    return null;
  }

  if (player.barn + 1 > MAX_BARN) {
    alert(외양간초과Alert);
    return null;
  }

  return {
    ...player,
    wood: player.wood - 5,
    barn: player.barn + 1,
    slots: player.slots.map((slot, idx) => {
      if (idx === index) return { ...BARN };
      return slot;
    }),
  };
}
