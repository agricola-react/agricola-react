import { currentPlayerIndexState, playersState, roundState } from '@/shared/recoil';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';

export const Header = () => {
  const round = useRecoilValue(roundState);
  const players = useRecoilValue(playersState);
  const currentPlayerIndex = useRecoilValue(currentPlayerIndexState);
  return (
    <div>
      <HeaderContainer>
        <div>아그리콜라 데모 버전</div>
        <div>{round} 라운드</div>
      </HeaderContainer>
      <p style={{ textAlign: 'center' }}>
        <strong
          style={{
            color: `${players[currentPlayerIndex].color}`,
          }}
        >
          {players[currentPlayerIndex].name}
        </strong>{' '}
        님의 차례입니다.
      </p>
    </div>
  );
};

const HeaderContainer = styled.div`
  background-color: #4c4c4c;
  color: white;
  padding: 15px 30px;
  border-radius: 20px;
  width: 300px;
  text-align: center;
  margin: 0px auto;
  font-weight: bold;
`;
