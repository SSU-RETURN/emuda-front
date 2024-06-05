/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { css, keyframes } from '@emotion/react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AppBarInEditMode from '../../../components/AppBarInEditMode/AppBarInEditMode';
import BottomNavigationBar from '../../../components/BottomNavigationBar/BottomNavigationBar';
import PlayListCell from '../../../components/PlayListCell/PlayListCell';
import { apiUrl } from '../../../config/config';
import emuda_logo from '../../../assets/emuda_logo.svg';
import mike from '../../../assets/mike.svg';
import angry_back from '../../../assets/background/wideBackground/angry_wideBack.png';
import anxious_back from '../../../assets/background/wideBackground/anxious_wideBack.png';
import flutter_back from '../../../assets/background/wideBackground/flutter_wideBack.png';
import happy_back from '../../../assets/background/wideBackground/happy_wideBack.png';
import sad_back from '../../../assets/background/wideBackground/sad_wideBack.png';
import DiaryIcon from '../../../assets/\bDiaryIcon';
import colors from '../../../Colors/Colors';

const containerStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 50px 20px;
  max-width: 800px;
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
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
  width: calc(100% - 78px);
  aspect-ratio: 1/1;
  background-size: cover;
  background-position: center;
  justify-content: center;
  align-content: center;
  box-sizing: border-box;
  border-radius: 13px;
  position: relative;
`;

const logoTextStyle = css`
  position: absolute;
  top: 6px;
  right: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  padding: 2px 4px;
  margin-bottom: 5px;
  img {
    height: 15px;
    width: 15px;
    margin-right: 7px;
  }
  span {
    transform: scaleX(1.2);
    color: white;
    font-family: 'Pretendard-Bold';
    font-size: 10px;
  }
`;

const fadeInOpacity = keyframes`
  0% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
`;

const fadeOutUp = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  30% {
    opacity: 0;
    transform: translateY(-20px);
  }
  60% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
  }
`;

const aniDivStyle = (isFadeOut) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.4;
  animation: ${isFadeOut ? fadeOutUp : fadeInOpacity} 2s forwards;

  ${isFadeOut &&
  css`
    animation: ${isFadeOut ? fadeOutUp : fadeInOpacity} 2s forwards;
  `}

  img {
    height: 30px;
    width: 30px;
    margin-left: 4px;
    animation: ${fadeInOpacity} 3s forwards;
    ${isFadeOut &&
    css`
      animation: ${isFadeOut ? fadeOutUp : fadeInOpacity} 2s forwards;
    `}
  }

  span {
    color: white;
    font-family: 'Pretendard-ExtraBold';
    font-size: 20px;
    text-shadow: 0px 0px 15px rgba(255, 255, 255, 0.7);
    animation: ${fadeInOpacity} 2s forwards;

    ${isFadeOut &&
    css`
      animation: ${fadeOutUp} 2s forwards;
    `}
  }
`;

const dateTextStyle = css`
  margin: 9px 0 2px 0px;
  font-size: 12px;
  font-family: 'Pretendard-Regular';
`;

const textStyle = (color) => css`
  margin-bottom: 14px;
  font-size: 12px;
  font-family: 'Pretendard-Light';
  color: ${color};
`;

const buttonStyle = (color) => css`
  padding: 7.5px 20px;
  display: flex;
  align-items: center;
  justify-items: center;
  font-size: 12px;
  font-family: 'Pretendard-Light';
  color: ${color};
  background-color: ${colors.lightGray02};
  border: 0px;
  border-radius: 10px;
`;

const lineDivStyle = css`
  width: 100%;
  height: 1px;
  background-color: ${colors.lightGray01};
  margin-top: 17px;
  margin-bottom: 14px;
`;

const playListCellStyle = css`
  width: 100%;
`;

const getBackgroundImage = (emotion) => {
  switch (emotion) {
    case 'ANGRY':
      return angry_back;
    case 'ANXIETY':
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

const getTextColor = (emotion) => {
  switch (emotion) {
    case 'ANGRY':
      return '#FF3E3E';
    case 'ANXIETY':
      return '#4D3EFF';
    case 'ROMANCE':
      return '#FF3E83';
    case 'HAPPY':
      return '#FFD53E';
    case 'SAD':
      return '#3EC5FF';
    default:
      return 'black';
  }
};

const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
const getDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};

const Container = ({ children }) => {
  return <div css={containerStyle}>{children}</div>;
};

const TodayRecommendationView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedEmotion } = location.state || { selectedEmotion: 'ROMANCE' };
  const queryParams = new URLSearchParams(location.search);
  const day = queryParams.get('day');
  const [isFadeOut, setIsFadeOut] = useState(false);

  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const memberId = Number(localStorage.getItem('memberId'));

        const response = await axios.get(`${apiUrl}/api/recommend/${memberId}/${getCurrentDate()}`);
        if (response.data && response.data.isSuccess) {
          const playlists = response.data.result.aiPlaylist;
          setPlaylist(playlists);
        }
      } catch (error) {
        alert('Error fetching playlist');
      }
    };

    fetchPlaylist();
  }, [day]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFadeOut((prev) => !prev);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleSelect = (id) => {
    setPlaylist((prevPlaylist) =>
      prevPlaylist.map((cell) =>
        cell.id === id ? { ...cell, type: cell.type === 'select' ? 'cancel' : 'select' } : cell
      )
    );
  };

  const backgroundImage = getBackgroundImage(selectedEmotion);
  const textColor = getTextColor(selectedEmotion);

  return (
    <Container>
      <AppBarInEditMode text="더보기" />
      <div css={contentStyle}>
        <div css={backgrounImgStyle(backgroundImage)}>
          <div css={logoTextStyle}>
            <img src={emuda_logo} />
            <span>EMUDA</span>
          </div>
          <div css={aniDivStyle(isFadeOut)}>
            <span>오늘의 노래 추천</span>
            <img src={mike} />
          </div>
        </div>
        <div css={dateTextStyle}>{getDate()}</div>
        <div css={textStyle(textColor)}>더 빛나는 오늘을 위한 추천곡 모음.</div>
        <button
          css={buttonStyle(textColor)}
          onClick={() =>
            navigate('/library', {
              state: {
                selectedEmotion,
              },
            })
          }
        >
          <DiaryIcon color={textColor} />
          <span>일기 보러가기</span>
        </button>
        <div css={lineDivStyle}></div>
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
          <div>아직 데이터가 부족해요</div>
        )}
      </div>
      <BottomNavigationBar current="/recommend" />
    </Container>
  );
};

export default TodayRecommendationView;
