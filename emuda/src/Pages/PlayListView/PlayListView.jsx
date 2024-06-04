/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { useLocation, useNavigate } from 'react-router-dom';
import AppBarInMainScreen from '../../components/AppBarInMainScreen/AppBarInMainScreen';
import BottomNavigationBar from '../../components/BottomNavigationBar/BottomNavigationBar';
import SelectBar from '../../components/SelectBar/SelectBar';
import DailyPlaylistCell from '../../components/DailyPlaylistCell/DailyPlaylistCell';
import PlayListCell from '../../components/PlayListCell/PlayListCell';
import SelectEmotionBar from '../../components/SelectBar/SelectEmotionBar';
import axios from 'axios';
import { apiUrl } from '../../config/config';
import Check from '../../assets/Check.svg';

const containerStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding: 50px 0;
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
  justify-content: flex-start;
  flex-grow: 1;
  margin-top: 10px;
  text-align: center;
  width: 99%;
  height: 100%;
  overflow-y: auto;
`;

const middleDivStyle = css`
  margin-top: 28px;
  margin-bottom: 18px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
`;

const checkStyle = css`
  width: 10px;
  height: 10px;
  margin-right: 8px;
`;

const returnText = (emotion) => {
  switch (emotion) {
    case 'SAD':
      return '슬픈 날 플레이리스트';
    case 'ROMANCE':
      return '설레는 날 플레이리스트';
    case 'HAPPY':
      return '기쁜 날 플레이리스트';
    case 'ANGRY':
      return '화난 날 플레이리스트';
    case 'ANXIETY':
      return '불안한 날 플레이리스트';
    default:
      return '플레이리스트';
  }
};

const emotionDescription = (emotion) => {
  switch (emotion) {
    case 'SAD':
      return '슬플 때 이런 노래들을 들었어요.';
    case 'ROMANCE':
      return '설렐 때 이런 노래들을 들었어요.';
    case 'HAPPY':
      return '기쁠 때 이런 노래들을 들었어요.';
    case 'ANGRY':
      return '화날 때 이런 노래들을 들었어요.';
    case 'ANXIETY':
      return '불안할 때 이런 노래들을 들었어요.';
    default:
      return '감정에 따라 들은 노래를 확인해보세요!';
  }
};

const Container = ({ children }) => {
  return <div css={containerStyle}>{children}</div>;
};

const PlayListView = () => {
  const [activeTab, setActiveTab] = useState('day');
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [dailyPlaylists, setDailyPlaylists] = useState([]);
  const [emotionPlaylists, setEmotionPlaylists] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.selectedEmotion) {
      setSelectedEmotion(location.state.selectedEmotion);
      setActiveTab('emotion');
    }
  }, [location.state]);

  const fetchDailyPlaylists = async () => {
    try {
      const memberId = localStorage.getItem('memberId');
      const response = await axios.get(`${apiUrl}/api/playlist/info/${memberId}`);
      if (response.data.isSuccess) {
        setDailyPlaylists(response.data.result);
      } else {
        console.error('Error fetching daily playlists');
      }
    } catch (error) {
      console.error('Error fetching playlists', error);
    }
  };

  const fetchEmotionPlaylists = async (emotion) => {
    try {
      const memberId = localStorage.getItem('memberId');
      const response = await axios.get(
        `${apiUrl}/api/playlist/emotion/${emotion}?memberId=${memberId}&page=0`
      );
      if (response.data.isSuccess) {
        setEmotionPlaylists(response.data.result);
      } else {
        console.error('Error fetching emotion playlists');
      }
    } catch (error) {
      console.error('Error fetching playlists', error);
    }
  };

  useEffect(() => {
    if (activeTab === 'day') {
      fetchDailyPlaylists();
    }
  }, [activeTab]);

  useEffect(() => {
    if (selectedEmotion) {
      fetchEmotionPlaylists(selectedEmotion);
    }
  }, [selectedEmotion]);

  const handleRoute = (type, day, emotion) => {
    navigate(`/more?type=${type}&day=${day}`, {
      state: {
        emotion,
      },
    });
  };

  return (
    <Container>
      <AppBarInMainScreen />
      <SelectBar activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'day' ? (
        <div css={contentStyle}>
          {dailyPlaylists.map((playlist) => (
            <DailyPlaylistCell
              key={playlist.playlistDate}
              date={playlist.playlistDate}
              text={returnText(playlist.memberEmotion)}
              emotion={playlist.memberEmotion}
              onClick={() => handleRoute('daily', playlist.playlistDate, playlist.memberEmotion)}
            />
          ))}
        </div>
      ) : (
        <div css={contentStyle}>
          <SelectEmotionBar
            selectedEmotion={selectedEmotion}
            onEmotionSelect={setSelectedEmotion}
          />
          <div css={middleDivStyle}>
            <img css={checkStyle} src={Check} />
            <span
              css={css`
                font-family: 'Pretendard-Light';
                font-size: 12px;
              `}
            >
              {emotionDescription(selectedEmotion)}
            </span>
          </div>
          {selectedEmotion ? (
            emotionPlaylists.length == 0 ? (
              <div
                css={css`
                  font-family: 'Pretendard-Light';
                  padding-top: 50%;
                  font-size: 14px;
                  color: #666;
                `}
              >
                선택된 음악이 없습니다 🫧
              </div>
            ) : (
              emotionPlaylists.map((playlist) => (
                <PlayListCell
                  key={`${playlist.id}-${playlist.title}`}
                  image={playlist.pictureKey}
                  title={playlist.title}
                  artist={playlist.artist}
                  description={playlist.description}
                  type="like"
                  emotion={selectedEmotion}
                />
              ))
            )
          ) : (
            <div
              css={css`
                font-family: 'Pretendard-Light';
                padding-top: 50%;
                font-size: 14px;
                color: #666;
              `}
            >
              감정을 선택해주세요 ✨
            </div>
          )}
        </div>
      )}
      <BottomNavigationBar current="/library" />
    </Container>
  );
};

export default PlayListView;
