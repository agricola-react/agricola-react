import styled from '@emotion/styled';
import { UserBoard } from 'page-src/agricola/user-section/user-section.sub/user-board';

export const UserSection = () => {
  return (
    <Container>
      <UserBoard />
      <UserBoard />
      <UserBoard />
      <UserBoard />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
