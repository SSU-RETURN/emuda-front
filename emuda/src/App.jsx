/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import AppBarInEditMode from './components/AppBarInEditMode/AppBarInEditMode';
import BottomNavigationBar from './components/BottomNavigationBar/BottomNavigationBar';

const containerStyle = css`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 0;
  max-width: 1200px;
  width: 100%;
  height: 100vh;
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
`;

const Container = ({ children }) => {
  return <div css={containerStyle}>{children}</div>;
};

function App() {
  return (
    <Container>
      <AppBarInEditMode></AppBarInEditMode>
      <BottomNavigationBar></BottomNavigationBar>
    </Container>
  );
}

export default App;
