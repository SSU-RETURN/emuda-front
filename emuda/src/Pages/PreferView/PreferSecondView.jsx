/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import AppBarInEditMode from '../../components/AppBarInEditMode/AppBarInEditMode';
import colors from '../../Colors/Colors';
import Button from '../../components/Button/Button';
import { useNavigate, useLocation } from 'react-router-dom';

// Styles
const pageStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 50px 0;
  max-width: 800px;
  width: 100%;
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

const progressBarStyle = (progress) => css`
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

const feelingLabelStyle = css`
  font-size: 16px;
  font-family: 'Pretendard-Medium';
  color: ${colors.black};
  margin-left: 5px;
  margin-bottom: 5px;
`;

const moodStyle = (isSelected, moodColor) => css`
  padding: 8px 16px;
  margin: 4px;
  border-radius: 10px;
  background-color: ${isSelected ? moodColor : 'white'};
  border: ${isSelected ? `0px solid ${moodColor}` : '1px solid #DFDFDF'};
  cursor: pointer;
  font-size: 16px;
  font-family: 'Pretendard-light';
  width: 100px;
  height: 40px;
`;

const moodContainerStyle = css`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;

const bottomBarStyle = css`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 -1px 4px -1px ${colors.lightGray01};
`;

// Component
const PreferSecond = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const selectedGenresEng = location.state?.selectedGenres;
  const [selectedMoods, setSelectedMoods] = useState({
    '슬플 땐': '',
    '기쁠 땐': '',
    '화날 땐': '',
    '설렐 땐': '',
    '불안할 땐': '',
  });
  const [progress, setProgress] = useState(50);

  const moodTranslation = {
    신나는: 'excited',
    잔잔한: 'calm',
    모름: null,
  };

  const reverseMoodTranslation = Object.fromEntries(
    Object.entries(moodTranslation).map(([k, v]) => [v, k])
  );

  useEffect(() => {
    if (state && state.reSetting) {
      console.log('reSetting이 true입니다.', state);
      const translatedMoods = Object.entries(state.selectedMoods).reduce(
        (acc, [category, mood]) => {
          if (mood) {
            acc[category] = reverseMoodTranslation[mood];
          } else {
            acc[category] = '모름';
          }
          return acc;
        },
        {}
      );
      setSelectedMoods(translatedMoods);
    }
  }, [state]);

  useEffect(() => {
    const selectedCount = Object.values(selectedMoods).filter(Boolean).length;
    setProgress(50 + 10 * selectedCount);
  }, [selectedMoods]);

  const moodColors = {
    '슬플 땐': colors.lightBlue,
    '기쁠 땐': colors.lightYellow,
    '설렐 땐': colors.lightPink,
    '화날 땐': colors.lightRed,
    '불안할 땐': colors.lightPurple,
  };

  const handleMoodClick = (category, mood) => {
    setSelectedMoods((prev) => ({
      ...prev,
      [category]: prev[category] === mood ? '' : mood,
    }));
  };

  const allMoodsSelected = Object.keys(moodColors).every(
    (category) => selectedMoods[category] !== ''
  );

  const handleNextClick = () => {
    const translatedMoods = Object.entries(selectedMoods).reduce((acc, [category, mood]) => {
      if (mood) {
        acc[category] = moodTranslation[mood];
      }
      return acc;
    }, {});

    if (state && state.reSetting) {
      navigate('/preferfin', {
        state: {
          selectedGenres: selectedGenresEng,
          selectedMoods: translatedMoods,
          reSetting: true,
        },
      });
    } else {
      navigate('/preferfin', {
        state: {
          selectedGenres: selectedGenresEng,
          selectedMoods: translatedMoods,
        },
      });
    }
  };

  return (
    <div css={pageStyle}>
      <AppBarInEditMode title="노래 취향" />
      <div css={progressBarContainerStyle}>
        <div css={progressBarLabelStyle(progress)}>{`${progress}%`}</div>
        <div css={progressBarStyle(progress)}></div>
      </div>
      <div css={headerTextStyle}>감정별 노래 취향을 정해주세요.</div>
      {Object.entries(moodColors).map(([label, color]) => (
        <div key={label}>
          <div css={feelingLabelStyle}>{label}</div>
          <div css={moodContainerStyle}>
            {['신나는', '잔잔한', '모름'].map((mood) => (
              <button
                key={mood}
                css={moodStyle(selectedMoods[label] === mood, color)}
                onClick={() => handleMoodClick(label, mood)}
              >
                {mood}
              </button>
            ))}
          </div>
        </div>
      ))}
      <div css={bottomBarStyle}>
        <Button text="다음" onClick={handleNextClick} disabled={!allMoodsSelected} />
      </div>
    </div>
  );
};

export default PreferSecond;
