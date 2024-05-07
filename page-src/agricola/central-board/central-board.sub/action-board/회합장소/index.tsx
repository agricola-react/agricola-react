import { MeepleFirst } from '@/shared/resource/meeple-first';
import { MeepleMinor } from '@/shared/resource/meeple-minor';
import styled from '@emotion/styled';
import { ActionContainer } from 'page-src/agricola/central-board/central-board.sub/action-board/shared/components/action-container';

export const 회합장소 = () => {
  return (
    <>
      <ActionContainer width={115} height={72} top={134} left={31} title="회합장소">
        <MeepleFirst width={10} height={20} />
        <Plus>+1</Plus>
        <MeepleMinor width={15} height={10} />
      </ActionContainer>
    </>
  );
};

const Plus = styled.div`
  font-weight: bold;
  font-size: 10px;
`;
