/** @jsxImportSource @emotion/react */
import { React, useEffect } from 'react';
import { css } from '@emotion/react';
import AppBarInEditMode from '../../components/AppBarInEditMode/AppBarInEditMode';
import colors from '../../Colors/Colors';
import Button from '../../components/Button/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { apiUrl } from '../../config/config';

const pageStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  max-width: 800px;
  width: 100%;
  height: 105vh;
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
  width: 100%;
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
  width: calc(100% - 40px);
  font-size: 20px;
  color: ${colors.black};
  text-align: left;
  margin-top: 30px;
  margin-bottom: 10px;
  font-family: 'Pretendard-SemiBold';
`;

const listItemStyle = css`
  width: calc(100% - 40px);
  padding: 10px 0px;
  margin: 5px 0;
  border-bottom: 1px solid ${colors.lightGray01};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 18px;
  box-sizing: border-box;
`;
const listNumStyle = css`
  text-align: left;
  font-family: 'Pretendard-Bold';
  margin: 0px;
  margin-right: 15px;
  padding: 0px;
  font-size: 20px;
  color: ${colors.mainBlue};
`;

const listGenresStyle = css`
  width: 100%;
  padding: 10px 0px;
  text-align: left;
  font-family: 'Pretendard-Medium';
  font-size: 16px;
  box-sizing: border-box;
`;

const listMoodStyle = (color) => css`
  width: auto;
  padding: 5px 15px;
  border-radius: 30px;
  margin: 7px;
  font-family: 'Pretendard-Regular';
  font-size: 15px;
  background-color: ${color};
`;

const listMoodTextStyle = css`
  text-align: left;
  font-family: 'Pretendard-Light';
  font-size: 15px;
`;

const fixButtonBoxStyle = css`
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

const moodMessage = (mood) => {
  switch (mood) {
    case null:
      return '모르겠어요';
    case 'excited':
      return '신나는 노래를 들어요';
    case 'calm':
      return '잔잔한 노래를 들어요';
    default:
      return '';
  }
};

const PreferFinView = () => {
  const location = useLocation();
  const { state } = location;
  const { selectedGenres, selectedMoods } = location.state;
  const progress = 100;
  const navigate = useNavigate();

  useEffect(() => {
    if (state && state.reSetting) {
      console.log('reSetting이 true입니다.', state.reSetting);
    }
  }, [state]);

  const moodColors = {
    '설렐 땐': colors.lightPink,
    '기쁠 땐': colors.lightYellow,
    '슬플 땐': colors.lightBlue,
    '화날 땐': colors.lightRed,
    '불안할 땐': colors.lightPurple,
  };

  const reverseGenreMapping = {
    DANCE: '댄스',
    BALLAD: '발라드',
    TROT: '트로트',
    HIPHOP: '힙합',
    BAND: '밴드',
    JAZZ: '재즈',
    CLASSIC: '클래식',
    POP: '팝',
    ROCK: '록',
    COUNTRY: '컨트리',
  };

  const createPreference = async (requestBody) => {
    try {
      const response = await axios.post(`${apiUrl}/api/preference/create`, requestBody);
      return response.data;
    } catch (error) {
      console.error('취향 생성 실패:', error);
      throw error;
    }
  };

  const updatePreference = async (requestBody) => {
    try {
      const response = await axios.put(`${apiUrl}/api/preference/update`, requestBody);
      return response.data;
    } catch (error) {
      console.error('취향 업데이트 실패:', error);
      throw error;
    }
  };

  const createPreferenceData = async (requestBody) => {
    try {
      const result = await createPreference(requestBody);
      if (result.isSuccess) {
        console.log('취향 생성 성공');
        navigate('/main');
      } else {
        alert(`취향 생성 실패: ${result.message}`);
      }
    } catch (error) {
      if (error.response) {
        console.error('취향 생성 실패:', error.response.data);
        const errorMessage = error.response.data.message || '취향 생성 문제가 발생했습니다.';
        alert(`${errorMessage}`);
      } else if (error.request) {
        alert('서버로부터 응답을 받지 못했습니다. 네트워크 상태를 확인해 주세요.');
      } else {
        alert('취향 생성  중 오류가 발생했습니다.');
      }
    }
  };

  const updatePreferenceData = async (requestBody) => {
    try {
      const result = await updatePreference(requestBody);
      if (result.isSuccess) {
        console.log('취향 업데이트 성공');
        navigate('/setting');
      } else {
        alert(`취향 업데이트 실패: ${result.message}`);
      }
    } catch (error) {
      if (error.response) {
        console.error('취향 업데이트 실패:', error.response.data);
        const errorMessage = error.response.data.message || '취향 업데이트 문제가 발생했습니다.';
        alert(`${errorMessage}`);
      } else if (error.request) {
        alert('서버로부터 응답을 받지 못했습니다. 네트워크 상태를 확인해 주세요.');
      } else {
        alert('취향 업데이트 중 오류가 발생했습니다.');
      }
    }
  };

  const handleNextClick = async () => {
    const memberId = localStorage.getItem('memberId');

    const requestBody = {
      memberId: Number(memberId),
      genreFirst: selectedGenres[0] || 'DANCE',
      genreSecond: selectedGenres[1] || 'DANCE',
      genreThird: selectedGenres[2] || 'DANCE',
      preferenceSad: selectedMoods['슬플 땐'] || null,
      preferenceHappy: selectedMoods['기쁠 땐'] || null,
      preferenceAngry: selectedMoods['화날 땐'] || null,
      preferenceRomance: selectedMoods['설렐 땐'] || null,
      preferenceAnxious: selectedMoods['불안할 땐'] || null,
    };

    if (state.reSetting) {
      updatePreferenceData(requestBody);
    } else {
      createPreferenceData(requestBody);
    }
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
          <span css={listNumStyle}>{index + 1} </span>
          <span css={listGenresStyle}>{reverseGenreMapping[genre] || genre}</span>
        </div>
      ))}

      <h2 css={headerTextStyle}>감정별 노래 취향</h2>
      {Object.entries(selectedMoods).map(([mood, choice], index) => (
        <div key={index} css={listItemStyle}>
          <div css={listMoodStyle(moodColors[mood] || '#ffffff')}>{mood}</div>
          <span css={listMoodTextStyle}>{moodMessage(choice)}</span>
        </div>
      ))}

      <div css={fixButtonBoxStyle}>
        <Button text="완료" onClick={handleNextClick} />
      </div>
    </div>
  );
};

export default PreferFinView;
