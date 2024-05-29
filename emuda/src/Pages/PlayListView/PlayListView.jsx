/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import AppBarInMainScreen from '../../components/AppBarInMainScreen/AppBarInMainScreen';
import BottomNavigationBar from '../../components/BottomNavigationBar/BottomNavigationBar';
import SelectBar from '../../components/SelectBar/SelectBar';
import DailyPlaylistCell from '../../components/DailyPlaylistCell/DailyPlaylistCell';
import PlayListCell from '../../components/PlayListCell/PlayListCell';
import SelectEmotionBar from '../../components/SelectBar/SelectEmotionBar';
import axios from 'axios';
import { apiUrl } from '../../config/config';

const containerStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding: 2vh 0 5vh 0;
  max-width: 800px;
  width: 100%;
  height: 91.5vh;
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

const returnText = (emotion) => {
  switch (emotion) {
    case 'SAD':
      return '슬픈 플레이리스트';
    case 'ROMANCE':
      return '설레는 플레이리스트';
    case 'HAPPY':
      return '기쁜 플레이리스트';
    case 'ANGRY':
      return '화나는 플레이리스트';
    case 'SURPRISE':
      return '깜짝 놀란 플레이리스트';
    default:
      return '플레이리스트';
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
      console.log(response.data.result);
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

  const handleRoute = (type, day) => {
    navigate(`/more?type=${type}&day=${day}`);
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
              onClick={() => handleRoute('daily', playlist.playlistDate)}
            />
          ))}
        </div>
      ) : (
        <div css={contentStyle}>
          <SelectEmotionBar
            selectedEmotion={selectedEmotion}
            onEmotionSelect={setSelectedEmotion}
          />
          {selectedEmotion ? (
            emotionPlaylists.length == 0 ? (
              <div
                css={css`
                  padding-top: 60%;
                  font-size: 18px;
                  color: #666;
                `}
              >
                선택된 음악이 없습니다
              </div>
            ) : (
              emotionPlaylists.map((playlist) => (
                <PlayListCell
                  key={`${playlist.id}-${playlist.title}`}
                  image={playlist.pictureKey}
                  title={playlist.title}
                  artist={playlist.artist}
                  description={playlist.description}
                  type="recommend"
                  emotion={selectedEmotion}
                />
              ))
            )
          ) : (
            <div
              css={css`
                padding-top: 60%;
                font-size: 18px;
                color: #666;
              `}
            >
              감정을 선택해주세요
            </div>
          )}
        </div>
      )}
      <BottomNavigationBar current="/library" />
    </Container>
  );
};

export default PlayListView;
