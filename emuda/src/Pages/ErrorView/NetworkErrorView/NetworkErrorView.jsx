/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import AppBarInMainScreen from '../../../components/AppBarInMainScreen/AppBarInMainScreen';
import BottomNavigationBar from '../../../components/BottomNavigationBar/BottomNavigationBar';
import ErrorIcon from '../../assets/ErrorIcon.svg';

const pageStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: center;
  align-items: center;
  margin: 0;
  max-width: 800px;
  width: 100%;
  min-height: 100vh;
  background-color: white;
  font-family: 'Pretendard-Medium';
`;

const contentStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const errorIconStyle = css`
  width: 150px;
  height: 136px;
  margin-bottom: 20px;
`;

const textStyle = css`
  font-family: 'Pretendard-Medium';
  font-size: 16px;
  color: #333;
  white-space: pre-line;
`;

const NetworkError = () => {
  return (
    <div css={pageStyle}>
      <AppBarInMainScreen />
      <div css={contentStyle}>
        <img src={ErrorIcon} alt="Error Icon" css={errorIconStyle} />
        <div css={textStyle}>네트워크 연결이{'\n'}되어 있지 않습니다.</div>
      </div>
      <BottomNavigationBar />
    </div>
  );
};

export default NetworkError;
