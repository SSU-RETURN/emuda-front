/** @jsxImportSource @emotion/react */
import { useState, React } from 'react';
import { css } from '@emotion/react';
import AppBarInMainScreen from '../../../components/AppBarInMainScreen/AppBarInMainScreen';
import BottomNavigationBar from '../../../components/BottomNavigationBar/BottomNavigationBar';
import Logo from '../../../assets/emuda_logo.svg';
import PlayListCell from '../../../components/PlayListCell/PlayListCell';
const containerStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding: 2vh 0 10vh 0;
  max-width: 800px;
  width: 100%;
  height: 91.5vh;
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
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  text-align: center;
  width: 100%;
  height: 100%; // 부모 컨테이너의 높이에 맞춰줍니다.
`;
const textStyle = css`
  margin: 10px 0 0 10px;
  font-size: 25px;
  display: flex;
  align-items: start;
`;

const playlistData = [
  { id: 1, title: '곡명1', artist: '아티스트', image: Logo, type: 'select', description: 'Hello' },
  { id: 1, title: '곡명1', artist: '아티스트', image: Logo, type: 'select', description: 'Hello' },
  { id: 1, title: '곡명1', artist: '아티스트', image: Logo, type: 'select', description: 'Hello' },
  { id: 1, title: '곡명1', artist: '아티스트', image: Logo, type: 'select', description: 'Hello' },
  { id: 1, title: '곡명1', artist: '아티스트', image: Logo, type: 'select', description: 'Hello' },
  { id: 1, title: '곡명1', artist: '아티스트', image: Logo, type: 'select', description: 'Hello' },
  { id: 1, title: '곡명1', artist: '아티스트', image: Logo, type: 'select', description: 'Hello' },
  { id: 1, title: '곡명1', artist: '아티스트', image: Logo, type: 'select', description: 'Hello' },
];
const Container = ({ children }) => {
  return <div css={containerStyle}>{children}</div>;
};

var MoreRecommendationView = () => {
  const [playlist, setPlaylist] = useState(playlistData);

  const handleSelect = (id) => {
    setPlaylist((prevPlaylist) =>
      prevPlaylist.map((cell) =>
        cell.id === id ? { ...cell, type: cell.type === 'select' ? 'cancel' : 'select' } : cell
      )
    );
  };
  return (
    <Container css={containerStyle}>
      <AppBarInMainScreen />
      <div css={contentStyle}>
        <div css={textStyle}>오늘의 노래 추천</div>
        {playlist.map((cell) => (
          <PlayListCell
            key={cell.id}
            image={cell.image}
            title={cell.title}
            artist={cell.artist}
            type={cell.type}
            onClick={() => handleSelect(cell.id)}
          />
        ))}
      </div>
      <BottomNavigationBar current="/recommend"></BottomNavigationBar>
    </Container>
  );
};

export default MoreRecommendationView;
