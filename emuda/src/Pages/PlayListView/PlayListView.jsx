/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import Button from '../../components/Button/Button';
import AppBarInMainScreen from '../../components/AppBarInMainScreen/AppBarInMainScreen';
import BottomNavigationBar from '../../components/BottomNavigationBar/BottomNavigationBar';
import Logo from '../../assets/emuda_logo.svg';
const containerStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding: 0;
  padding-bottom: 5vh;
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
  justify-content: center;
  text-align: center;
  height: 100%; // 부모 컨테이너의 높이에 맞춰줍니다.
`;

const textStyle = css`
  margin-bottom: 20px; // 텍스트와 버튼 사이의 간격
  color: #000; // 여기서 텍스트 색상을 조정할 수 있습니다.
  font-size: 16px; // 적절한 텍스트 크기로 조정
  // 여기에 필요한 추가 스타일을 적용하세요.
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
  animation: rotate 5s linear infinite;
`;
const Container = ({ children }) => {
  return <div css={containerStyle}>{children}</div>;
};

var PlayListView = ({ isDiaryWritten }) => {
  const handleReload = () => {
    window.location.reload();
  };
  return (
    <Container css={containerStyle}>
      <AppBarInMainScreen />

      {isDiaryWritten ? (
        <Button text="hello" onclick={handleReload}></Button>
      ) : (
        <div css={contentStyle}>
          <img src={Logo} css={musicIconStyle} alt="Music Note" />
          <div css={textStyle}>노래 추천을 위해 오늘의 일기를 작성해주세요.</div>
          <Button onClick={window.location.reload} text="일기 작성하기"></Button>
        </div>
      )}

      <BottomNavigationBar current="/library"></BottomNavigationBar>
    </Container>
  );
};

export default PlayListView;
