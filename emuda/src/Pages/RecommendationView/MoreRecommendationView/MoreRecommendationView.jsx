/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import AppBarInEditMode from '../../../components/AppBarInEditMode/AppBarInEditMode';
import BottomNavigationBar from '../../../components/BottomNavigationBar/BottomNavigationBar';
import PlayListCell from '../../../components/PlayListCell/PlayListCell';
import { apiUrl } from '../../../config/config';
import emuda_logo from '../../../assets/emuda_logo.svg';
import angry_back from '../../../assets/background/wideBackground/angry_wideBack.png';
import anxious_back from '../../../assets/background/wideBackground/anxious_wideBack.png';
import flutter_back from '../../../assets/background/wideBackground/flutter_wideBack.png';
import happy_back from '../../../assets/background/wideBackground/happy_wideBack.png';
import sad_back from '../../../assets/background/wideBackground/sad_wideBack.png';
import colors from '../../../Colors/Colors';

const containerStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 50px 20px;
  max-width: 800px;
  width: 100%;
  @media screen and (max-width: 800px) {
    height: 90vh;
  }
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
  min-width: 255px;
  min-height: 255px;
  width: calc(100% - 38px);
  padding: 11px;
  aspect-ratio: 1/1;
  background-size: cover;
  background-position: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: start;
  position: relative;
  border-radius: 13px;
`;

const getBackgroundImage = (emotion) => {
  switch (emotion) {
    case 'ANGRY':
      return angry_back;
    case 'ANXIOUS':
      return anxious_back;
    case 'FLUTTER':
      return flutter_back;
    case 'HAPPY':
      return happy_back;
    case 'SAD':
      return sad_back;
    default:
      return flutter_back;
  }
};

const logoTextStyle = css`
  font-family: 'Pretendard-Bold';
  position: absolute;
  top: 11px;
  right: 11px;
  display: flex;
  align-items: center;
  span {
    transform: scaleX(1.2);
    color: white;
    font-size: 10px;
    margin-left: 4.15px;
  }
`;

const logoImgStyle = css`
  height: 15px;
  width: 15.85px;
`;

const dayTextStyle = css`
  color: white;
  font-size: 40px;
  font-family: 'Pretendard-Medium';
  text-shadow: 0px 0px 15px rgba(255, 255, 255, 0.5);
  &::first-letter {
    font-size: 42px;
  }
`;

const textStyle = css`
  color: white;
  font-size: 30px;
  font-family: 'Pretendard-Bold';
  &::first-letter {
    font-size: 33px;
  }
`;

const subTextStyle = css`
  width: calc(100% - 38px);
  text-align: start;
  font-size: 18px;
  font-family: 'Pretendard-Light';
  margin-top: 9px;
`;

const miniTextStyle = css`
  width: calc(100% - 38px);
  text-align: start;
  font-size: 15px;
  font-family: 'Pretendard-Light';
  color: ${colors.lightGray03};
  margin-top: 3px;
`;

const lineDivStyle = css`
  width: 100%;
  height: 1px;
  background-color: ${colors.lightGray01};
  margin-top: 17px;
  margin-bottom: 14px;
`;

const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

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

  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const memberId = Number(localStorage.getItem('memberId'));
        const page = 0;
        if (type === 'daily') {
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
        } else {
          const response = await axios.get(
            `${apiUrl}/api/recommend/${memberId}/${getCurrentDate()}`
          );
          if (response.data && response.data.isSuccess) {
            const playlists = response.data.result;
            if (type === 'ai') {
              setPlaylist(playlists.aiPlaylist);
            } else if (type === 'emotion') {
              setPlaylist(playlists.memberEmotionPlaylist);
            }
          } else {
            console.error('Error fetching the playlist.');
          }
        }
      } catch (error) {
        alert('Error fetching playlist');
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
          <div css={logoTextStyle}>
            <img css={logoImgStyle} src={emuda_logo} />
            <span>EMUDA</span>
          </div>
          <span css={dayTextStyle}>{formattedDay}</span>
        </div>
        <span css={subTextStyle}>노래추천</span>
        <div css={miniTextStyle}>노래와 함께 지난 추억을 회상해 보세요!</div>
        <div css={lineDivStyle}></div>
        {playlist.map((cell) => (
          <PlayListCell
            key={cell.id}
            image={cell.pictureKey}
            title={cell.title}
            artist={cell.artist}
            type="like"
            description={cell.description}
            onClick={() => handleSelect(cell.id)}
          />
        ))}
      </div>
      <BottomNavigationBar current="/library" />
    </Container>
  );
};

export default MoreRecommendationView;
