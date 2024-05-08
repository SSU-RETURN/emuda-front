/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import AppBarInMainScreen from '../../components/AppBarInMainScreen/AppBarInMainScreen';
import BottomNavigationBar from '../../components/BottomNavigationBar/BottomNavigationBar';
import SelectBar from '../../components/SelectBar/SelectBar';
import DailyPlaylistCell from '../../components/DailyPlaylistCell/DailyPlaylistCell';
import PlayListCell from '../../components/PlayListCell/PlayListCell';
import SelectEmotionBar from '../../components/SelectBar/SelectEmotionBar';
import Logo from '../../assets/emuda_logo.svg';

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

const Container = ({ children }) => {
  return <div css={containerStyle}>{children}</div>;
};

var PlayListView = () => {
  const [activeTab, setActiveTab] = useState('day');
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [dailyPlaylists, setDailyPlaylists] = useState([]);
  const [emotionPlaylists, setEmotionPlaylists] = useState([]);

  useEffect(() => {
    //여기서 fetch하기
    const playlistData = [
      { id: 1, date: '2024년 3월 20일', text: '행복한 플레이리스트', emotion: 'happy' },
      { id: 2, date: '2024년 3월 21일', text: '슬픈 플레이리스트', emotion: 'sad' },
      { id: 3, date: '2024년 3월 22일', text: '흥미진진한 플레이리스트', emotion: 'exciting' },
      { id: 4, date: '2024년 3월 23일', text: '불안한 플레이리스트', emotion: 'anxiety' },
      { id: 5, date: '2024년 3월 24일', text: '화난 플레이리스트', emotion: 'angry' },
    ];
    setDailyPlaylists(playlistData);
    const musicData = [
      {
        id: 1,
        image: Logo,
        title: '잊지 말아요',
        artist: '백지영',
        description: '애절한 발라드의 진수를 보여주는 곡',
        type: 'recommend',
        emotion: 'sad',
      },
      {
        id: 2,
        image: Logo,
        title: '밤편지',
        artist: '아이유',
        description: '심야의 감성을 자극하는 서정적인 멜로디',
        type: 'recommend',
        emotion: 'anxiety',
      },
      {
        id: 3,
        image: Logo,
        title: 'Celebrity',
        artist: '아이유',
        description: '자신만의 색을 잃지 말라는 메시지를 담은 곡',
        type: 'recommend',
        emotion: 'happy',
      },
      {
        id: 4,
        image: Logo,
        title: '강남 스타일',
        artist: '싸이',
        description: '전 세계를 뒤흔든 역동적인 비트의 곡',
        type: 'recommend',
        emotion: 'exciting',
      },
      {
        id: 5,
        image: Logo,
        title: '그대에게',
        artist: '버즈',
        description: '록 발라드의 감성을 담은 이별 곡',
        type: 'recommend',
        emotion: 'sad',
      },
      {
        id: 6,
        image: Logo,
        title: '내 손을 잡아',
        artist: '아이유',
        description: '평온하고 따뜻한 위로를 건네는 곡',
        type: 'recommend',
        emotion: 'anxiety',
      },
      {
        id: 7,
        image: Logo,
        title: '빨간 맛',
        artist: '레드벨벳',
        description: '상큼하고 발랄한 여름 노래',
        type: 'recommend',
        emotion: 'happy',
      },
      {
        id: 8,
        image: Logo,
        title: '판타지',
        artist: 'VIXX',
        description: '강렬하고 몽환적인 분위기의 곡',
        type: 'recommend',
        emotion: 'exciting',
      },
      {
        id: 9,
        image: Logo,
        title: '거짓말',
        artist: '빅뱅',
        description: '거친 이별의 아픔을 그린 곡',
        type: 'recommend',
        emotion: 'angry',
      },
      {
        id: 10,
        image: Logo,
        title: '넌 이즈 뭔들',
        artist: '마마무',
        description: '강한 자신감을 느낄 수 있는 곡',
        type: 'recommend',
        emotion: 'exciting',
      },
      {
        id: 11,
        image: Logo,
        title: '광화문에서',
        artist: '규현',
        description: '서정적이면서도 애절한 감성의 솔로 곡',
        type: 'recommend',
        emotion: 'sad',
      },
      {
        id: 12,
        image: Logo,
        title: '소주 한 잔',
        artist: '임창정',
        description: '술에 취한 밤의 애절함을 담은 곡',
        type: 'recommend',
        emotion: 'sad',
      },
      {
        id: 13,
        image: Logo,
        title: 'Dynamite',
        artist: '방탄소년단',
        description: '신나는 디스코 팝으로 전 세계를 사로잡은 곡',
        type: 'recommend',
        emotion: 'happy',
      },
      {
        id: 14,
        image: Logo,
        title: '어떤 날엔',
        artist: '김재환',
        description: '따뜻한 목소리로 위로를 건네는 발라드',
        type: 'recommend',
        emotion: 'anxiety',
      },
      {
        id: 15,
        image: Logo,
        title: '신호등',
        artist: '이무진',
        description: '일상의 소중함을 노래한 곡',
        type: 'recommend',
        emotion: 'happy',
      },
      {
        id: 17,
        image: Logo,
        title: 'Lilac',
        artist: '아이유',
        description: '봄날의 설렘과 아쉬운 이별을 그린 곡',
        type: 'recommend',
        emotion: 'exciting',
      },
      {
        id: 18,
        image: Logo,
        title: '밤편지',
        artist: '아이유',
        description: '심야의 쓸쓸함을 담아낸 곡',
        type: 'recommend',
        emotion: 'sad',
      },
      {
        id: 19,
        image: Logo,
        title: '사랑의 인사',
        artist: '손승연',
        description: '감미롭고 서정적인 멜로디의 곡',
        type: 'recommend',
        emotion: 'happy',
      },
      {
        id: 20,
        image: Logo,
        title: '마지막처럼',
        artist: '블랙핑크',
        description: '강렬한 비트와 멜로디가 돋보이는 곡',
        type: 'recommend',
        emotion: 'exciting',
      },
    ];
    setEmotionPlaylists(musicData);
  }, []);

  return (
    <Container>
      <AppBarInMainScreen />
      <SelectBar activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'day' ? (
        <div css={contentStyle}>
          {dailyPlaylists.map((playlist) => (
            <DailyPlaylistCell
              key={playlist.id}
              date={playlist.date}
              text={playlist.text}
              emotion={playlist.emotion}
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
            emotionPlaylists
              .filter((p) => p.emotion === selectedEmotion)
              .map((playlist) => (
                <PlayListCell
                  key={playlist.id}
                  image={playlist.image}
                  title={playlist.title}
                  artist={playlist.artist}
                  description={playlist.description}
                  type={playlist.type}
                  emotion={playlist.emotion}
                />
              ))
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
