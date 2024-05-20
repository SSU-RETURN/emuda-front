/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import AppBarInEditMode from '../../components/AppBarInEditMode/AppBarInEditMode';
import colors from '../../Colors/Colors';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';

const pageStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding: 0;
  max-width: 800px;
  width: 100%;
  height: 100vh;
  font-family: 'Pretendard-Medium';
`;

const progressBarContainerStyle = css`
  display: flex;
  align-items: center;
  width: 330px;
  margin: 20px 0;
`;

const progressBarLabelStyle = () => css`
  font-size: 14px;
  color: ${colors.mainBlue};
  margin-right: 10px;
  font-weight: bold;
`;

const progressBarStyle = progress => css`
  width: 320px;
  height: 20px;
  background-color: #ddd;
  border-radius: 10px;
  overflow: hidden;
  position: relative;

  &::after {
    content: '';
    display: block;
    height: 100%;
    width: ${progress}%;
    background-color: ${colors.mainBlue};
    border-radius: 10px;
  }
`;

const headerTextStyle = css`
  font-size: 20px;
  color: ${colors.black};
  text-align: center;
  margin-top: 15px;
  margin-bottom: 30px;
  font-family: 'Pretendard-SemiBold';
`;

const listItemStyle = css`
  width: 330px;
  padding: 10px 20px;
  margin: 5px 0;
  border-bottom: 1px solid ${colors.lightGray01};
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
`;

const moodMessage = mood => {
  switch(mood) {
    case '모름': return '모르겠어요';
    case '신나는': return '신나는 노래를 들어요';
    case '잔잔한': return '잔잔한 노래를 들어요';
    default: return '';
  }
};

const PreferFinView = () => {
  const selectedGenres = ['댄스', '발라드', '팝'];
  const selectedMoods = { '슬플 때': '잔잔한', '기쁠 때': '신나는', '설렐 때': '모름', '화날 때': '모름', '불안할 때': '신나는'}; // Simulating previously selected moods
  const progress = 100;
  const navigate = useNavigate();

  const handleNextClick = () => {
    navigate('/main');
  };


  return (
    <div css={pageStyle}>
      <AppBarInEditMode title="노래 취향" />
      <div css={progressBarContainerStyle}>
        <div css={progressBarLabelStyle(progress)}>{`${progress}%`}</div>
        <div css={progressBarStyle(progress)}></div>
      </div>

      <h1 css={headerTextStyle}>선호 장르</h1>
      {selectedGenres.map((genre, index) => (
        <div key={index} css={listItemStyle}>
          {`${index + 1} ${genre}`}
        </div>
      ))}

      <h2 css={headerTextStyle}>감정별 노래 취향</h2>
      {Object.entries(selectedMoods).map(([mood, choice], index) => (
        <div key={index} css={listItemStyle}>
          {mood} {moodMessage(choice)}
        </div>
      ))}

      <Button text="완료" onClick={handleNextClick} />
    </div>
  );
};

export default PreferFinView;