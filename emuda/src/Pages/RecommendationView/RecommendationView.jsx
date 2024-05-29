/* eslint-disable no-console */
/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import Button from '../../components/Button/Button';
import AppBarInMainScreen from '../../components/AppBarInMainScreen/AppBarInMainScreen';
import BottomNavigationBar from '../../components/BottomNavigationBar/BottomNavigationBar';
import Logo from '../../assets/emuda_logo.svg';
import PlayListCell from '../../components/PlayListCell/PlayListCell';
import { useNavigate } from 'react-router-dom';
import colors from '../../Colors/Colors';
import axios from 'axios';
import { apiUrl } from '../../config/config';

const containerStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 70px 0;
  max-width: 800px;
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
  .btn:active,
  .btn:focus {
    outline: none !important;
    box-shadow: none !important;
  }
  body {
    margin: 0;
    padding: 0;
  }
  font-family: 'Pretendard-Medium';
`;

const contentStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  margin-top: 10px;
  text-align: center;
  width: 100%;
  height: 100%;
`;

const divStyle = (color) => css`
  flex: 1;
  width: 100%;
  overflow: visible;
  background-color: ${color};
  display: flex;
  flex-direction: column;
  align-items: stretch;
  border: 1px solid black;
`;

const buttonTextStyle = css`
  margin-bottom: 20px;
  color: #000;
  font-size: 16px;
`;

const textStyle = css`
  margin-left: 10px;
`;

const musicIconStyle = css`
  height: 20vh;
  width: 20vh;
  margin-bottom: 20px;
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  animation: rotate 1s linear infinite;
`;

const playListCellStyle = css`
  margin-bottom: 50px;
`;

const Container = ({ children }) => {
  return <div css={containerStyle}>{children}</div>;
};

const RecommendationView = ({ isDiaryWritten }) => {
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

  const getPlaylist = async () => {
    try {
      //const memberId = Number(localStorage.getItem('memberId'));
      const response = await axios.get(`${apiUrl}/api/recommend/1/2024-05-23`);
      // 실제 사용 시
      // const response = await axios.get(`${apiUrl}/api/recommend/${memberId}/${getCurrentDateforAPI()}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      alert('Error while Getting Playlist');
    }
  };

  const fetchData = async () => {
    try {
      const playlists = await getPlaylist();
      if (playlists && playlists.isSuccess) {
        const aipl = playlists.result.aiPlaylist;
        const empl = playlists.result.memberEmotionPlaylist;
        setAiPlaylist(aipl.slice(0, 3));
        setEmotionPlaylist(empl.slice(0, 3));
      } else {
        console.log('Error while Getting Playlists.');
      }
    } catch (error) {
      alert('Error Fetching PlayList');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const playlistDivStyle = (props) => css`
    ${divStyle};
    background-color: ${props.color};
    max-height: 60vh;
    overflow-y: auto;
  `;

  const navigate = useNavigate();
  const [aiPlaylist, setAiPlaylist] = useState([]);
  const [emotionPlaylist, setEmotionPlaylist] = useState([]);
  const nickname = localStorage.getItem('nickname');
  const handleRoute = (type) => {
    navigate(`/more?type=${type}`);
  };

  return (
    <Container>
      <Container css={containerStyle}>
        <AppBarInMainScreen />
        {isDiaryWritten ? (
          <div css={containerStyle}>
            <div
              css={css`
                ${playlistDivStyle({ color: colors.lightPink })};
                margin-top: 10px;
              `}
            >
              <span
                css={css`
                  ${textStyle};
                  margin-top: 10px;
                  font-size: 13px;
                `}
              >
                {getCurrentDate()}
              </span>
              <span
                css={css`
                  ${textStyle};
                  font-size: 18px;
                `}
              >
                오늘 {nickname}님을 위한 추천 노래들이예요!
              </span>
              {aiPlaylist.map((cell) => (
                <PlayListCell
                  key={cell.id}
                  image={cell.pictureKey}
                  title={cell.title}
                  artist={cell.artist}
                  css={playListCellStyle}
                  description={cell.description}
                  onClick={() => null}
                />
              ))}
              <span
                onClick={() => handleRoute('ai')}
                css={css`
                  ${textStyle};
                  text-align: right;
                  margin: 0 10px 5px 0;
                  font-size: 12px;
                `}
              >
                더보기&gt;
              </span>
            </div>
            <div
              css={css`
                ${playlistDivStyle({ color: 'white' })};
                padding-bottom: 10px;
              `}
            >
              <span
                css={css`
                  ${textStyle};
                  margin-top: 10px;
                  font-size: 15px;
                `}
              >
                {nickname}님은 설렐 때 이런 노래를 들었어요
              </span>
              <span
                onClick={() => handleRoute('emotion')}
                css={css`
                  ${textStyle};
                  text-align: right;
                  margin: 0 10px 5px 0;
                  font-size: 12px;
                `}
              >
                더보기&gt;
              </span>
              {emotionPlaylist.map((cell) => (
                <PlayListCell
                  key={cell.id}
                  image={cell.image}
                  title={cell.title}
                  artist={cell.artist}
                  css={playListCellStyle}
                  description={cell.description}
                  onClick={() => null}
                />
              ))}
            </div>
          </div>
        ) : (
          <div css={contentStyle}>
            <img src={Logo} css={musicIconStyle} alt="Music Note" />
            <div css={buttonTextStyle}>노래 추천을 위해 오늘의 일기를 작성해주세요.</div>
            <Button onClick={handleRoute} text="일기 작성하기"></Button>
          </div>
        )}
        <BottomNavigationBar current="/recommend"></BottomNavigationBar>
      </Container>
    </Container>
  );
};

export default RecommendationView;
