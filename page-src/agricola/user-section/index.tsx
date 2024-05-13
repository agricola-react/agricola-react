import { playersState } from '@/shared/recoil';
import styled from '@emotion/styled';
import { UserBoard } from 'page-src/agricola/user-section/user-section.sub/user-board';
import { useRecoilValue } from 'recoil';
import { Theme } from '@radix-ui/themes';
import JobCard from './job-card';

export const UserSection = () => {
  const players = useRecoilValue(playersState);
  return (
    <Container>
      <JobCard />

      {players.map(player => (
        <UserBoard key={player.number} player={player} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
