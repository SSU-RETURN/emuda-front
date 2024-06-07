/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import ErrorIcon from '../../../assets/iphone_ErrorIcon.svg';
import colors from '../../../Colors/Colors';

const pageStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: center;
  align-items: center;
  margin: 0;
  padding: 0px;
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
`;

const subTextStyle = css`
  font-family: 'Pretendard-Light';
  font-size: 12px;
  color: ${colors.lightGray03};
`;

const ResizeWarningView = () => {
  return (
    <div css={pageStyle}>
      <div css={contentStyle}>
        <img src={ErrorIcon} alt="Error Icon" css={errorIconStyle} />
        <div css={textStyle}>지원하지 않는 화면 넓이입니다.</div>
        <div css={subTextStyle}>⌦ EMUDA 서비스의 경우 넓이 600이하의 기기만 지원합니다.</div>
      </div>
    </div>
  );
};

export default ResizeWarningView;
