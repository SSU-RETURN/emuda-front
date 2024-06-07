/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import LoginView from './Pages/LoginView/LoginView';
import ResizeWarning from './Pages/ErrorView/ResizeWarningView/ResizeWarningView';

const containerStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  .btn:active,
  .btn:focus {
    outline: none !important;
    box-shadow: none !important;
  }
`;

const Container = ({ children }) => {
  return <div css={containerStyle}>{children}</div>;
};

function App() {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 600);

  useEffect(() => {
    const handleResize = () => {
      const isLarge = window.innerWidth > 600;
      setIsLargeScreen(isLarge);
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <Container>{isLargeScreen ? <ResizeWarning /> : <LoginView />}</Container>
    </>
  );
}

export default App;
