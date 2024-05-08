/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import AppBarInMainScreen from './components/AppBarInMainScreen/AppBarInMainScreen';
// import AppBarInEditMode from './components/AppBarInEditMode/AppBarInEditMode';
import BottomNavigationBar from './components/BottomNavigationBar/BottomNavigationBar';
import './Fonts/Font.css';
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

const Container = ({ children }) => {
  return <div css={containerStyle}>{children}</div>;
};

function App() {
  return (
    <Container>
      <AppBarInMainScreen></AppBarInMainScreen>
      <BottomNavigationBar current="/"></BottomNavigationBar>
    </Container>
  );
}

export default App;
