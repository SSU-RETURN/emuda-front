/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { css, keyframes } from '@emotion/react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import AppBarInEditMode from '../../../components/AppBarInEditMode/AppBarInEditMode';
import BottomNavigationBar from '../../../components/BottomNavigationBar/BottomNavigationBar';
import PlayListCell from '../../../components/PlayListCell/PlayListCell';
import SquarePlayListCell from '../../../components/PlayListCell/SquarePlayListCell';
import { apiUrl } from '../../../config/config';
import angry_back from '../../../assets/background/wideBackground/angry_wideBack.png';
import anxious_back from '../../../assets/background/wideBackground/anxious_wideBack.png';
import flutter_back from '../../../assets/background/wideBackground/flutter_wideBack.png';
import happy_back from '../../../assets/background/wideBackground/happy_wideBack.png';
import sad_back from '../../../assets/background/wideBackground/sad_wideBack.png';
import mike from '../../../assets/mike.svg';
import colors from '../../../Colors/Colors';

const containerStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 50px 0px 70px 0px;
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
  width: 100%;
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
`;

const backgrounImgStyle = (backgroundImage) => css`
  background-image: url(${backgroundImage});
  width: 100%;
  padding: 7px;
  aspect-ratio: 2.6/1;
  background-size: cover;
  background-position: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 7px;
  padding: 20px;
`;

const getBackgroundImage = (emotion) => {
  switch (emotion) {
    case 'ANGRY':
      return angry_back;
    case 'ANXIETY':
      return anxious_back;
    case 'ROMANCE':
      return flutter_back;
    case 'HAPPY':
      return happy_back;
    case 'SAD':
      return sad_back;
    default:
      return flutter_back;
  }
};

const textDivStyle = css`
  width: max-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  margin-right: 14px;
`;

const logoTextStyle = css`
  display: flex;
  align-items: center;
  border-radius: 30px;
  border: 1px solid #857979;
  padding: 2px 4px;
  margin-bottom: 5px;
  span {
    color: #857979;
    font-family: 'Pretendard-Medium';
    font-size: 8px;
  }
`;

const dayTextStyle = css`
  color: white;
  font-size: 20px;
  font-family: 'Pretendard-Regular';
`;

const textStyle = css`
  font-size: 20px;
  font-family: 'Pretendard-SemiBold';
`;

const subTextStyle = css`
  font-size: 10px;
  font-family: 'Pretendard-Light';
  color: ${colors.lightGray03};
  margin-left: 12px;
`;

const squarePlayListCellStyle = css`
  width: 100%;
  height: max-content;
  display: flex;
  overflow-x: scroll;
  box-sizing: border-box;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const playListCellStyle = css`
  width: 100%;
`;

const noDataTextStyle = css`
  font-family: 'Pretendard-Light';
  padding: 10% 0;
  font-size: 14px;
  color: #666;
`;

const explanDivStyle = css`
  display: flex;
  margin-top: 45px;
  margin-bottom: 15px;
  width: 100%;
  height: min-content;
  align-items: end;
`;

const miniTextStyle = css`
  width: max-content;
  font-size: 12px;
  font-family: 'Pretendard-Light';
  color: white;
  margin-top: 3px;
`;

const iconDivStyle = css`
  position: relative;
  width: 70%;
  aspect-ratio: 1.5/1;
`;

const smallCircleDivStyle = (backgroundColor) => css`
  position: absolute;
  top: 6px;
  left: 0px;
  height: 75%;
  aspect-ratio: 1/1;
  background-color: ${backgroundColor};
  opacity: 0.5;
  border-radius: 50%;
`;

const bigCircleDivStyle = (backgroundColor) => css`
  position: absolute;
  right: 0px;
  height: 100%;
  aspect-ratio: 1/1;
  background-color: ${backgroundColor};
  opacity: 0.5;
  border-radius: 50%;
`;

const getBackgroundColor = (emotion) => {
  switch (emotion) {
    case 'HAPPY':
      return '#FFFBE4';
    case 'SAD':
      return '#DDF4F8';
    default:
      return '#FFE3E5';
  }
};

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-15px);
  }
  60% {
    transform: translateY(-5px);
  }
`;

const mikeImgStyle = css`
  position: absolute;
  right: 38px;
  bottom: -7px;
  height: 90%;
  aspect-ratio: 1/1;
  animation: ${bounce} 2s infinite;
`;

const formatDate = (dateStr) => {
  return dateStr.replace(/-/g, '.');
};

const Container = ({ children }) => {
  return <div css={containerStyle}>{children}</div>;
};

const MoreRecommendationView = () => {
  const location = useLocation();
  const { state } = location;
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get('type');
  const day = queryParams.get('day');
  const formattedDay = formatDate(day);
  const selectedEmotion = state ? state.emotion : 'FLUTTER';
  const backgroundImage = getBackgroundImage(selectedEmotion);
  const backgroundColor = getBackgroundColor(selectedEmotion);

  const [aiPlaylist, setAiPlaylist] = useState([]);
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const memberId = Number(localStorage.getItem('memberId'));
        const response = await axios.get(`${apiUrl}/api/recommend/${memberId}/${day}`);
        if (response.data && response.data.isSuccess) {
          const playlists = response.data.result.aiPlaylist;
          setAiPlaylist(playlists);
        }
      } catch (error) {
        alert('Error fetching playlist');
      }
    };

    fetchPlaylist();
  }, [day]);

  useEffect(() => {
    const fetchPlaylist = async () => {
      const memberId = Number(localStorage.getItem('memberId'));
      const page = 0;
      try {
        const response = await axios.get(
          `${apiUrl}/api/playlist/date/${day}?memberId=${memberId}&page=${page}`
        );
        if (response.data && response.data.isSuccess) {
          setPlaylist(response.data.result);
        } else {
          console.error('Error fetching daily playlist.');
        }
      } catch (error) {
        console.error('Error fetching daily playlist', error);
      }
    };

    fetchPlaylist();
  }, [type, day]);

  const handleSelect = (id) => {
    setPlaylist((prevPlaylist) =>
      prevPlaylist.map((cell) =>
        cell.id === id ? { ...cell, type: cell.type === 'select' ? 'cancel' : 'select' } : cell
      )
    );
  };

  return (
    <Container>
      <AppBarInEditMode text="더보기" />
      <div css={contentStyle}>
        <div css={backgrounImgStyle(backgroundImage)}>
          <div css={textDivStyle}>
            <div css={logoTextStyle}>
              <span>EMUDA</span>
            </div>
            <span css={dayTextStyle}>{formattedDay}</span>
            <div css={miniTextStyle}>노래와 함께 추억을 회상해 보세요!</div>
          </div>
          <div css={iconDivStyle}>
            <div css={smallCircleDivStyle(backgroundColor)}></div>
            <div css={bigCircleDivStyle(backgroundColor)}></div>
            <img css={mikeImgStyle} src={mike} alt="mike" />
          </div>
        </div>
        <div css={explanDivStyle}>
          <span css={textStyle}>추천 플레이리스트</span>
          <span css={subTextStyle}>AI 추천 노래</span>
        </div>

        <div css={squarePlayListCellStyle}>
          {aiPlaylist.length > 0 ? (
            aiPlaylist.map((cell) => (
              <SquarePlayListCell
                key={cell.id}
                image={cell.pictureKey}
                title={cell.title}
                artist={cell.artist}
              />
            ))
          ) : (
            <span css={noDataTextStyle}>추천 노래가 없어요 🌧️</span>
          )}
        </div>

        <div css={explanDivStyle}>
          <span css={textStyle}>내가 담은 플레이리스트</span>
        </div>
        {playlist.length > 0 ? (
          playlist.map((cell) => (
            <PlayListCell
              key={cell.id}
              css={playListCellStyle}
              image={cell.pictureKey}
              title={cell.title}
              artist={cell.artist}
              type="like"
              description={cell.description}
              onClick={() => handleSelect(cell.id)}
            />
          ))
        ) : (
          <span css={noDataTextStyle}>담은 노래가 없어요 🫧</span>
        )}
      </div>
      <BottomNavigationBar current="/library" />
    </Container>
  );
};

export default MoreRecommendationView;
