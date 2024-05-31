import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const JOB_CARDS = [
  '/job-card/마술사.jpg',
  '/job-card/창고관리인.jpg',
  '/job-card/채소장수.jpg',
  '/job-card/나무꾼.jpg',
  '/job-card/보조경작자.jpg',
  '/job-card/쟁기몰이꾼.jpg',
];

const JOB_CARDS2 = [
  '/sub-card/곡식용삽.jpg',
  '/sub-card/다진흙.jpg',
  '/sub-card/돌집게.jpg',
  '/sub-card/목재소.jpg',
  '/sub-card/물통.jpg',
  '/sub-card/병.jpg',
];

const ROTATE_INTERVAL_MS = 800;

const IndexPage = () => {
  const router = useRouter();
  const [shouldChangeFront, setShouldChangeFront] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setShouldChangeFront(prev => !prev);
    }, ROTATE_INTERVAL_MS * 2);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <StyledBackground>
      <CardsWrapper>
        {JOB_CARDS.map((cardUrl, index) => (
          <CardWrapper key={cardUrl}>
            <FrontWrapper shouldChangeFront={shouldChangeFront} delay={index * 100}>
              <CardImage src={cardUrl} />
            </FrontWrapper>
            <BackWrapper shouldChangeFront={shouldChangeFront} delay={index * 100}>
              <CardImage src="/job-card/직업카드.jpg" />
            </BackWrapper>
          </CardWrapper>
        ))}
      </CardsWrapper>
      <div className="flex flex-col justify-center items-center">
        <div className="font-bold">아그리콜라에 오신 것을 환영합니다!</div>
        <div>코드를 입력해주세요!</div>
        <StyledInput
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder="데모버전비밀번호: 1234"
        />
        <StyledButton
          onClick={() => {
            if (inputValue === '1234') {
              window.sessionStorage.setItem('isAccept', 'true');
              router.push('/agricola');
            } else {
              alert('실패!');
            }
          }}
        >
          확인
        </StyledButton>
      </div>
      <CardsWrapper>
        {JOB_CARDS2.map((cardUrl, index) => (
          <CardWrapper key={cardUrl}>
            <FrontWrapper shouldChangeFront={shouldChangeFront} delay={Math.abs(index - 6) * 100}>
              <CardImage src={cardUrl} />
            </FrontWrapper>
            <BackWrapper shouldChangeFront={shouldChangeFront} delay={Math.abs(index - 6) * 100}>
              <CardImage src="/sub-card/보조카드.jpg" />
            </BackWrapper>
          </CardWrapper>
        ))}
      </CardsWrapper>
    </StyledBackground>
  );
};

const StyledBackground = styled.div`
  background-image: url('https://x.boardgamearena.net/data/themereleases/current/games/agricola/220107-0030/img/background.jpg');
  background-repeat: repeat;
  overflow: scroll;
  height: 100vh;
  width: 100%;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const CardsWrapper = styled.div`
  display: flex;
  gap: 15px;
  border-radius: 10px;
`;

const CardWrapper = styled.div`
  position: relative;
  transform-style: preserve-3d;
  width: 120px;
  height: 200px;
`;

const CardRotator = styled.div<{ delay: number }>`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transition: ${ROTATE_INTERVAL_MS / 1000}s;
  transition-delay: ${props => props.delay}ms;
  backface-visibility: hidden;
`;

const FrontWrapper = styled(CardRotator)<{ shouldChangeFront: boolean }>`
  z-index: 2;
  transform: ${props => `rotateY(${180 * (props.shouldChangeFront ? 1 : 0)}deg)`};
`;

const BackWrapper = styled(CardRotator)<{ shouldChangeFront: boolean }>`
  transform: rotateY(180deg);
  transform: ${props => `rotateY(${180 * (props.shouldChangeFront ? 0 : 1)}deg)`};
`;

const CardImage = styled.img`
  width: 120px;
  height: 200px;
  object-fit: contain;
  border-radius: 20px;
`;

const StyledInput = styled.input`
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px;
  margin: 10px;
  background-color: white;
`;

const StyledButton = styled.button`
  background-color: white;
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px;
  margin: 10px;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
`;

export default IndexPage;
