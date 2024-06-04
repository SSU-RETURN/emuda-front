/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AppBarInEditMode from '../../../components/AppBarInEditMode/AppBarInEditMode';
import BottomNavigationBar from '../../../components/BottomNavigationBar/BottomNavigationBar';
import PlayListCell from '../../../components/PlayListCell/PlayListCell';
import { apiUrl } from '../../../config/config';
import angry_back from '../../../assets/background/angry_back.png';
import anxious_back from '../../../assets/background/anxious_back.png';
import flutter_back from '../../../assets/background/flutter_back.png';
import happy_back from '../../../assets/background/happy_back.png';
import sad_back from '../../../assets/background/sad_back.png';
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
  box-sizing: border-box;
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

const getTextColor = (emotion) => {
  switch (emotion) {
    case 'ANGRY':
      return '#FF3E3E';
    case 'ANXIOUS':
      return '#4D3EFF';
    case 'FLUTTER':
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
  const { selectedEmotion } = location.state || { selectedEmotion: 'FLUTTER' };
  const queryParams = new URLSearchParams(location.search);
  const day = queryParams.get('day');

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
        <div css={backgrounImgStyle(backgroundImage)}></div>
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
