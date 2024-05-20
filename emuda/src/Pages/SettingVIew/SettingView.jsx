/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import AppBarInEditMode from '../../components/AppBarInEditMode/AppBarInEditMode';
import Logo from '../../assets/emuda_logo.svg';
import BottomNavigationBar from '../../components/BottomNavigationBar/BottomNavigationBar';
import SettingButton from '../../components/Button/SettingButton';
// Styles
const containerStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 0;
  max-width: 800px;
  width: 100%;
  height: 80vh;
  overflow: hidden;
  box-sizing: border-box;
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
  justify-content: start;
  flex-grow: 1;
  margin-top: 20px;
  text-align: center;
  width: 100%;
  height: 100%;
`;

const imageStyle = css`
  height: 120px;
  width: 120px;
  border-radius: 60px;
  border: 1px solid black;
  margin-bottom: 10px;
`;

// Component
const SettingView = () => {
  let nickname = '서윤하';
  return (
    <div css={containerStyle}>
      <AppBarInEditMode text="마이페이지" />
      <div css={contentStyle}>
        <img src={Logo} css={imageStyle} />
        <span>{nickname}님</span>
        <SettingButton text="회원 정보 수정" onClick={null}></SettingButton>
        <SettingButton text="로그아웃" onClick={null}></SettingButton>
        <SettingButton text="탈퇴하기" onClick={null}></SettingButton>
        <SettingButton text="노래취향 재설정" onClick={null}></SettingButton>
      </div>
      <BottomNavigationBar current="/home"></BottomNavigationBar>
    </div>
  );
};

export default SettingView;
