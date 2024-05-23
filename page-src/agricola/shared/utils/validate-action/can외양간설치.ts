import { Player } from '@/shared/recoil';

export function can외양간설치(player: Player) {
  return player.wood >= 5;
}
