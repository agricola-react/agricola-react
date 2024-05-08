import { roundState } from '@/shared/recoil';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';

export const Header = () => {
  const round = useRecoilValue(roundState);
  return (
    <HeaderContainer>
      <div>아그리콜라 데모 버전</div>
      <div>{round.round} 라운드</div>
    </HeaderContainer>
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
