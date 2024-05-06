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
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 10px;
  height: 600px;
`;
