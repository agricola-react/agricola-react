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
      <FloatingTopButton
        left={20}
        onClick={() => {
          // 게임 상태 정의
        }}
      >
        1번
      </FloatingTopButton>
      <FloatingTopButton
        left={80}
        onClick={() => {
          // 게임 상태 정의
        }}
      >
        2번
      </FloatingTopButton>
      <FloatingTopButton
        left={140}
        onClick={() => {
          // 게임 상태 정의
        }}
      >
        3번
      </FloatingTopButton>
      <FloatingTopButton
        left={200}
        onClick={() => {
          // 게임 상태 정의
        }}
      >
        4번
      </FloatingTopButton>
    </div>
  );
};

const FloatingTopButton = styled.div<{ left: number }>`
  position: absolute;
  top: 20px;
  left: ${props => props.left}px;
  background-color: white;
  border: 1px solid black;
  border-radius: 10px;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  font-size: 20px;
  font-weight: bold;
`;

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
