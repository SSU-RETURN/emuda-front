/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import AppBarInMainScreen from '../../../components/AppBarInMainScreen/AppBarInMainScreen';
import BottomNavigationBar from '../../../components/BottomNavigationBar/BottomNavigationBar';
import PlayListCell from '../../../components/PlayListCell/PlayListCell';
import { apiUrl } from '../../../config/config';

const containerStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding: 70px 0;
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
  align-items: start;
  justify-content: flex-start; /* Changed from center to flex-start */
  text-align: center;
`;

const textStyle = css`
  margin: 10px 0 0 10px;
  font-size: 25px;
  display: flex;
  align-items: start;
`;

const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const Container = ({ children }) => {
  return <div css={containerStyle}>{children}</div>;
};

const MoreRecommendationView = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get('type');
  const day = queryParams.get('day');

  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        //이것도 실제 사용때는 써야해요
        //const memberId = Number(localStorage.getItem('memberId'));
        if (type === 'daily') {
          try {
            const response = await axios.get(`${apiUrl}/api/playlist/date/${day}`);
            if (response.data && response.data.isSuccess) {
              setPlaylist(response.data.result);
            } else {
              console.error('Error fetching daily playlist.');
            }
          } catch (error) {
            console.error('Error fetching daily playlist', error);
          }
        } else {
          const response = await axios.get(`${apiUrl}/api/recommend/1/2024-05-23`);
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

        // 실제 사용 시
        // const response = await axios.get(`${apiUrl}/api/recommend/${memberId}/${getCurrentDate()}`);
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
      <AppBarInMainScreen />
      <div css={contentStyle}>
        <div css={textStyle}>{type === 'daily' ? `${day}의 플레이리스트` : '오늘의 노래 추천'}</div>
        {playlist.map((cell) => (
          <PlayListCell
            key={cell.id}
            image={cell.pictureKey}
            title={cell.title}
            artist={cell.artist}
            type="recommend"
            description={cell.description}
            onClick={() => handleSelect(cell.id)}
          />
        ))}
      </div>
      <BottomNavigationBar current="/recommend" />
    </Container>
  );
};

export default MoreRecommendationView;
