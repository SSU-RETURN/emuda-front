/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';
import AppBarInMainScreen from '../../components/AppBarInMainScreen/AppBarInMainScreen';
import BottomNavigationBar from '../../components/BottomNavigationBar/BottomNavigationBar';
import SelectBar from '../../components/SelectBar/SelectBar';
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
  justify-content: center;
  flex-grow: 1;
  margin-top: 10px;
  text-align: center;
  width: 99%;
  height: 100%;
  border: 1px solid black;
`;
const Container = ({ children }) => {
  return <div css={containerStyle}>{children}</div>;
};

var PlayListView = () => {
  const [activeTab, setActiveTab] = useState('day');
  return (
    <Container>
      <AppBarInMainScreen />
      <Container css={containerStyle}>
        <SelectBar activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === 'day' ? <div css={contentStyle}>1</div> : <div css={contentStyle}>2</div>}
        <BottomNavigationBar current="/library" />
      </Container>
    </Container>
  );
};

export default PlayListView;
