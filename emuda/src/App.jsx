/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import './Fonts/Font.css';
import LoginView from './Pages/LoginView/LoginView';

const containerStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  padding: 0;
  width: 100%;
  box-sizing: border-box;
  .btn:active,
  .btn:focus {
    outline: none !important;
    box-shadow: none !important;
  }
  body {
    margin: 0 !important;
    padding: 0 !important;
  }
  font-family: 'Pretendard-Medium';
`;

const Container = ({ children }) => {
  return <div css={containerStyle}>{children}</div>;
};

function App() {
  return (
    <Container>
      <LoginView></LoginView>
    </Container>
  );
}

export default App;
