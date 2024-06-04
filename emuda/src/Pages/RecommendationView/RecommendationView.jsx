/* eslint-disable no-console */
/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import Button from '../../components/Button/Button';
import AppBarInMainScreen from '../../components/AppBarInMainScreen/AppBarInMainScreen';
import BottomNavigationBar from '../../components/BottomNavigationBar/BottomNavigationBar';
import Logo from '../../assets/emuda_logo.svg';
import PlayListCell from '../../components/PlayListCell/PlayListCell';
import { useNavigate, useLocation } from 'react-router-dom';
import colors from '../../Colors/Colors';
import axios from 'axios';
import { apiUrl } from '../../config/config';

const containerStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 50px 0px;
  max-width: 800px;
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
`;

const subContainerStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 800px;
  width: 100%;
  overflow: hidden;
  padding: 0px;
  box-sizing: border-box;
`;

const contentStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  text-align: center;
  width: 100%;
`;

const buttonTextStyle = css`
  color: #000;
  margin-top: 70px;
  margin-bottom: 30px;
  font-size: 16px;
  white-space: pre-line;
`;

const textStyle = css`
  width: 100%;
`;

const infoSpanStyle = css`
  height: 100px;
  width: 100%;
  text-align: center;
  align-content: center;
  font-family: 'Pretendard-Light';
  color: black;
  font-size: 15px;
  background-color: ${colors.lightGray02};
  opacity: 0.5;
  border-radius: 10px;
`;

const musicIconStyle = css`
  width: 15vh;
  margin-top: 140px;
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  animation: rotate 10s linear infinite;
`;

const playListCellStyle = css`
  width: 100%;
`;

const buttonStyle = css`
  width: 100%;
  padding: 0px 72px;
  box-sizing: border-box;
`;

const Container = ({ children }) => {
  return <div css={containerStyle}>{children}</div>;
};

const RecommendationView = ({ isDiaryWritten }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [aiPlaylist, setAiPlaylist] = useState([]);
  const [emotionPlaylist, setEmotionPlaylist] = useState([]);
  const [diaryWritten, setDiaryWritten] = useState(isDiaryWritten);
  const [emotion, setEmotion] = useState(colors.white);
  const [divColor, setDivColor] = useState(colors.white);
  const nickname = localStorage.getItem('nickname');

  const getColor = async (date) => {
    const memberId = localStorage.getItem('memberId');
    try {
      const response = await axios.get(`${apiUrl}/api/diary/${memberId}/${date}`);
      console.log('Diary emotion:', response.data.result.emotion);
      setEmotion(response.data.result.emotion);

      switch (response.data.result.emotion) {
        case 'SAD':
          return colors.lightBlue;
        case 'HAPPY':
          return colors.lightYellow;
        case 'ANGRY':
          return colors.lightRed;
        case 'ROMANCE':
          return colors.lightPink;
        case 'ANXIETY':
          return colors.lightPurple;
        default:
          return colors.white;
      }
    } catch (error) {
      alert('Error while Getting Date');
      return colors.white;
    }
  };

  const getCurrentDateforAPI = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const daysOfWeek = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    const dayOfWeek = daysOfWeek[today.getDay()];
    return `${year}년 ${month}월 ${day}일 ${dayOfWeek}`;
  };

  const getPlaylist = async (date) => {
    try {
      const memberId = localStorage.getItem('memberId');
      const response = await axios.get(`${apiUrl}/api/recommend/${memberId}/${date}`);
      console.log('Playlist response:', response.data);
      return response.data;
    } catch (error) {
      alert('Error while Getting Playlist');
      return null;
    }
  };

  const fetchData = async (date) => {
    try {
      const playlists = await getPlaylist(date);
      if (playlists && playlists.isSuccess) {
        const aipl = playlists.result.aiPlaylist;
        const empl = playlists.result.memberEmotionPlaylist;
        setAiPlaylist(aipl.slice(0, 3));
        console.log(aiPlaylist);
        setEmotionPlaylist(empl.slice(0, 3));
      } else {
        console.log('Error while Getting Playlists.');
        setDiaryWritten(false);
      }
    } catch (error) {
      alert('Error Fetching PlayList');
      setDiaryWritten(false);
    }
  };

  useEffect(() => {
    const date = getCurrentDateforAPI();
    fetchData(date);
    getColor(date).then((color) => setDivColor(color));
  }, [location.search]);

  const renderRecomandTextWithLineBreak = (nickname) => {
    const text = `오늘 ${nickname}님을 위한 추천 노래들이예요!`;
    const maxLength = 22;
    if (text.length > maxLength) {
      return (
        <>
          오늘 {nickname}님을 위한
          <br />
          추천 노래들이예요!
        </>
      );
    }
    return text;
  };

  const renderEmotionTextWithLineBreak = (nickname, emotion) => {
    let text = '';
    switch (emotion) {
      case 'SAD':
        text = `${nickname}님은 슬플 때 이런 노래들을 들었어요`;
        break;
      case 'ROMANCE':
        text = `${nickname}님은 설렐 때 이런 노래들을 들었어요`;
        break;
      case 'HAPPY':
        text = `${nickname}님은 기쁠 때 이런 노래들을 들었어요`;
        break;
      case 'ANGRY':
        text = `${nickname}님은 화날 때 이런 노래들을 들었어요`;
        break;
      case 'ANXIOUS':
        text = `${nickname}님은 불안할 때 이런 노래들을 들었어요`;
        break;
      default:
        text = `${nickname}님은 이런 노래들을 들었어요`;
        break;
    }
    const maxLength = 26;
    if (text.length > maxLength) {
      const firstPart = text.slice(0, -18);
      const secondPart = text.slice(-18);
      return (
        <>
          {firstPart}
          <br />
          {secondPart}
        </>
      );
    }
    return text;
  };

  const playlistDivStyle = (color) => css`
    flex: 1;
    width: 100%;
    overflow: visible;
    background-color: ${color};
    padding: 25px 20px 11px 20px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    box-sizing: border-box;
  `;

  const handleRoute = () => {
    navigate('/todayRecommend', {
      state: {
        selectedEmotion: emotion,
      },
    });
  };

  const handleLibrary = () => {
    navigate('/library', {
      state: {
        selectedEmotion: emotion,
      },
    });
  };

  const handleDiaryRoute = () => {
    navigate('/write');
  };

  return (
    <Container css={containerStyle}>
      <AppBarInMainScreen />
      {diaryWritten ? (
        <div css={subContainerStyle}>
          <div css={playlistDivStyle(divColor)}>
            <span
              css={css`
                ${textStyle};
                font-family: 'Pretendard-Medium';
                font-size: 16px;
              `}
            >
              {getCurrentDate()}
            </span>
            <span
              css={css`
                ${textStyle};
                font-family: 'Pretendard-Bold';
                font-size: 20px;
                margin-bottom: 23px;
              `}
            >
              {renderRecomandTextWithLineBreak(nickname)}
            </span>
            {aiPlaylist.map((cell) => (
              <PlayListCell
                key={cell.id}
                css={playListCellStyle}
                image={cell.pictureKey}
                title={cell.title}
                artist={cell.artist}
                description={cell.description}
                onClick={() => null}
              />
            ))}
            <span
              onClick={() => handleRoute('ai')}
              css={css`
                ${textStyle};
                text-align: right;
                margin-top: 13px;
                font-size: 10px;
              `}
            >
              더보기&gt;
            </span>
          </div>
          <div
            css={css`
              ${playlistDivStyle('white')};
              padding-bottom: 38px;
            `}
          >
            <span
              css={css`
                ${textStyle};
                font-size: 15px;
                font-family: 'Pretendard-SemiBold';
              `}
            >
              {renderEmotionTextWithLineBreak(nickname, emotion)}
            </span>
            <span
              onClick={() => handleLibrary()}
              css={css`
                ${textStyle};
                text-align: right;
                margin-top: -8px;
                font-size: 10px;
                margin-bottom: 15px;
              `}
            >
              더보기&gt;
            </span>
            {emotionPlaylist.length > 0 ? (
              emotionPlaylist.map((cell) => (
                <PlayListCell
                  key={cell.id}
                  css={playListCellStyle}
                  image={cell.pictureKey}
                  title={cell.title}
                  artist={cell.artist}
                  description={cell.description}
                  onClick={() => null}
                />
              ))
            ) : (
              <span css={infoSpanStyle}>아직 데이터가 부족해요💧</span>
            )}
          </div>
        </div>
      ) : (
        <div css={contentStyle}>
          <img src={Logo} css={musicIconStyle} alt="Music Note" />
          <div css={buttonTextStyle}>노래 추천을 위해{'\n'}오늘의 일기를 작성해주세요.</div>
          <div css={buttonStyle}>
            <Button onClick={handleDiaryRoute} text="일기 작성하기"></Button>
          </div>
        </div>
      )}
      <BottomNavigationBar current="/recommend" />
    </Container>
  );
};

export default RecommendationView;
