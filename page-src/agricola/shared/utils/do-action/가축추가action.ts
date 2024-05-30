import { Player } from '@/shared/recoil';
import { LiveStock } from 'page-src/agricola/player-board/player-board.sub/slot';

export function 가축추가action(player: Player, index: number, animal: LiveStock): Player | null {
  const animalKey =
    animal === '양' ? 'sheep' : animal === '돼지' ? 'pig' : animal === '소' ? 'cattle' : undefined;

  if (!animalKey) {
  }

  if (player.slots[index].type === null) {
    if (player.slots[index].resource === '외양간') {
      return {
        ...player,
        [animalKey]: player[animalKey] + 1,
      };
    }
  }
}
