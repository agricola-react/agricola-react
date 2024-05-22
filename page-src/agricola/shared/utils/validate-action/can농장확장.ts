import { Player } from '@/shared/recoil';

export function can농장확장(player: Player, count: number) {
  return player[player.roomType] >= count * 5 && player.reed >= count * 2;
}
