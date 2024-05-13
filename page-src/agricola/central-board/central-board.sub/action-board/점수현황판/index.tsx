import { playersState } from '@/shared/recoil';
import { Arrow } from '@/shared/resource/arrow';
import { Barn } from '@/shared/resource/barn';
import { Grain } from '@/shared/resource/grain';
import { MeepleCattle } from '@/shared/resource/meeple-cattle';
import { MeepleFence } from '@/shared/resource/meeple-fence';
import { MeepleField } from '@/shared/resource/meeple-field';
import { MeepleFirst } from '@/shared/resource/meeple-first';
import { MeeplePig } from '@/shared/resource/meeple-pig';
import { MeepleSheep } from '@/shared/resource/meeple-sheep';
import { Vegetable } from '@/shared/resource/vegetable';
import { Field } from 'page-src/agricola/player-board/player-board.sub/field';
import { useRecoilValue } from 'recoil';
import { RoomClay } from './../../../../../../shared/resource/room-clay';
import { RoomStone } from '@/shared/resource/room-stone';
import { MeepleChild } from '@/shared/resource/meeple-child';
import { MeepleMinor } from '@/shared/resource/meeple-minor';
import { Farmer } from '@/shared/resource/farmer';
import { Reed } from '@/shared/resource/reed';
import { MeepleFood } from './../../../../../../shared/resource/meeple-food';

// const PointCal = (items:any) => {
//     return(
//       switch(items) {
//         /* 밭 */
//         case '수정':
//           if('수정')
//           [break]

//         case ''
//       }
//     )
// }

const PointNow = () => {
  const players = useRecoilValue(playersState);
  return (
    <table>
      <thead>
        <tr>
          <th>분류</th>
          <th colSpan={2}>플레이어1</th>
          <th colSpan={2}>플레이어2</th>
          <th colSpan={2}>플레이어3</th>
          <th colSpan={2}>플레이어4</th>
        </tr>
      </thead>
      <tbody>
        {/* 밭 */}
        <tr>
          {/* 데이터가 없어서 소 데이터 가져옴 */}
          <td>밭</td>
          {players.map(player => (
            <>
              {/* 각 항목 개수 */}
              <td className="flex items-center">
                <div>{player.cattle}</div>
                <MeepleField width={20} height={20} />
              </td>
              {/* 개수 해당점수 */}
              <td>-1</td>
            </>
          ))}
        </tr>
        {/* 우리 */}
        <tr>
          {/* 데이터가 없어서 소 데이터 가져옴 */}
          <td>우리</td>
          {players.map(player => (
            <>
              {/* 각 항목 개수 */}
              <td className="flex items-center">
                <div>{player.cattle}</div>
                <MeepleFence width={20} height={20} />
              </td>
              {/* 개수 해당점수 */}
              <td>-1</td>
            </>
          ))}
        </tr>
        {/* 곡식 */}
        <tr>
          <td>곡식</td>
          {players.map(player => (
            <>
              {/* 각 항목 개수 */}
              <td className="flex items-center">
                <div>{player.grain}</div>
                <Grain width={20} height={20} />
              </td>
              {/* 개수 해당점수 */}
              <td>-1</td>
            </>
          ))}
        </tr>
        {/* 채소 */}
        <tr>
          <td>채소</td>
          {players.map(player => (
            <>
              {/* 각 항목 개수 */}
              <td className="flex items-center">
                <div>{player.vegetable}</div>
                <Vegetable width={20} height={20} />
              </td>
              {/* 개수 해당점수 */}
              <td>-1</td>
            </>
          ))}
        </tr>
        {/* 양 */}
        <tr>
          <td>양</td>
          {players.map(player => (
            <>
              {/* 각 항목 개수 */}
              <td className="flex items-center">
                <div>{player.sheep}</div>
                <MeepleSheep width={20} height={20} />
              </td>
              {/* 개수 해당점수 */}
              <td>-1</td>
            </>
          ))}
        </tr>
        {/* 멧돼지 */}
        <tr>
          <td>멧돼지</td>
          {players.map(player => (
            <>
              {/* 각 항목 개수 */}
              <td className="flex items-center">
                <div>{player.pig}</div>
                <MeeplePig width={20} height={20} />
              </td>
              {/* 개수 해당점수 */}
              <td>-1</td>
            </>
          ))}
        </tr>
        {/* 소 */}
        <tr>
          <td>소</td>
          {players.map(player => (
            <>
              {/* 각 항목 개수 */}
              <td className="flex items-center">
                <div>{player.cattle}</div>
                <MeepleCattle width={20} height={20} />
              </td>
              {/* 개수 해당점수 */}
              <td>-1</td>
            </>
          ))}
        </tr>
        {/* 돼지 이건뭐지? */}
        <tr>
          <td>돼지</td>
          {players.map(player => (
            <>
              {/* 각 항목 개수 */}
              <td className="flex items-center">
                <MeepleCattle width={20} height={20} />
                <div>{player.pig}</div>
              </td>
              {/* 개수 해당점수 */}
              <td>-1</td>
            </>
          ))}
        </tr>
        {/* 빈칸 */}
        <tr>
          <td>빈칸</td>
          {players.map(player => (
            <>
              {/* 빈칸 데이터 없어서 외양간 데이터 넣음*/}
              {/* 빈칸 사진 없어서 소로 */}
              <td className="flex items-center">
                <div>{player.barn}</div>
                <MeepleCattle width={20} height={20} />
              </td>
              {/* 개수 해당점수 */}
              <td>-1</td>
            </>
          ))}
        </tr>
        {/* 울타리 친 외양간 */}
        <tr>
          <td>울타리 친 외양간</td>
          {players.map(player => (
            <>
              {/* 각 항목 개수 */}
              <td className="flex items-center">
                <div>{player.barn}</div>
                <Barn width={20} height={20} />
              </td>
              {/* 개수 해당점수 */}
              <td>-1</td>
            </>
          ))}
        </tr>
        {/* 흙집방 */}
        <tr>
          <td>흙집 개수</td>
          {players.map(player => (
            <>
              {/* 각 항목 개수 */}
              <td className="flex items-center">
                {/* 흙집 데이터 없어서 흙 넣음 */}
                <div>{player.clay}</div>
                <RoomClay width={20} height={20} />
              </td>
              {/* 개수 해당점수 */}
              <td>-1</td>
            </>
          ))}
        </tr>
        {/* 돌집방 */}
        <tr>
          <td>돌집 개수</td>
          {players.map(player => (
            <>
              {/* 개수 */}
              <td className="flex items-center">
                {/* 돌집 데이터가 없어서 돌 넣긴 했는데 필요는 없을듯? */}
                <div>{player.stone}</div>
                <RoomStone width={20} height={20} />
              </td>
              {/* 개수 해당점수 */}
              <td>-1</td>
            </>
          ))}
        </tr>
        {/* 가족수 */}
        <tr>
          <td>가족수</td>
          {players.map(player => (
            <>
              {/* 여긴 갯수 */}
              <td className="flex items-center">
                {/* farmer가 맞나? */}
                <div>{player.farmer}</div>
                <Farmer width={20} height={20} />
              </td>
              {/* 여긴 갯수에 해당하는 점수 */}
              <td>-1</td>
            </>
          ))}
        </tr>
        {/* 구걸카드 */}
        <tr>
          <td>구걸토큰</td>
          {players.map(player => (
            <>
              {/* 여긴 갯수 */}
              <td className="flex items-center">
                {/* 구걸토큰이 없어서 푸드로 데이터 가져옴 */}
                <div>{player.food}</div>
                {/* 구걸토큰 사진이 없어서 푸드로 가져옴 */}
                <MeepleFood width={20} height={20} />
              </td>
              {/* 여긴 갯수에 해당하는 점수 */}
              <td>-1</td>
            </>
          ))}
        </tr>
        {/* 카드점수 */}
        <tr>
          <td>카드점수</td>
          {players.map(player => (
            <>
              {/* 여긴 갯수 */}
              <td className="flex items-center">
                {/* 카드 점수 데이터 없어서 */}
                <div>{player.barn}</div>
              </td>
              {/* 여긴 갯수에 해당하는 점수 */}
              <td>-1</td>
            </>
          ))}
        </tr>
        {/* 추가점수 */}
        <tr>
          <td>추가점수</td>
          {players.map(player => (
            <>
              {/* 여긴 갯수 */}
              <td className="flex items-center">
                {/* 추가 점수 데이터 없어서 */}
                <div>{player.barn}</div>
              </td>
              {/* 여긴 갯수에 해당하는 점수 */}
              <td>-1</td>
            </>
          ))}
        </tr>
        {/* 쭉 tr 이어서 붙이다가 마지막에 결과 */}
        <tr>
          <td>합계</td>
          {players.map(player => (
            <td className="items-center" key={player.number}>
              10점
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default PointNow;
