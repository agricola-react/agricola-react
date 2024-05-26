'use client';

import React, { useState, useEffect } from 'react';
const getStateFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const round = localStorage.getItem('round');
    if (round) {
      return Number(JSON.parse(round));
    }
  }

  return 0;
};

const LocalStorageTest = () => {
  // useState 초기값을 로컬 스토리지에서 가져온 값으로 설정
  const [round, setRound] = useState(getStateFromLocalStorage());
  const [loading, setLoading] = useState(true);

  // round 상태가 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem('round', JSON.stringify(round));
    setLoading(false);
  }, [round]);

  // 예시로 round 값을 변경하는 함수
  const increaseRound = () => {
    setRound(prevRound => prevRound + 1);
  };

  return (
    <div>
      {loading ? (
        <div></div>
      ) : (
        <>
          <p>Current Round: {round}</p>
          <button onClick={increaseRound}>Increase Round</button>
        </>
      )}
    </div>
  );
};

export default LocalStorageTest;
