import styled from '@emotion/styled';

export const Header = () => {
  return <HeaderContainer>아그리콜라 데모 버전</HeaderContainer>;
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
