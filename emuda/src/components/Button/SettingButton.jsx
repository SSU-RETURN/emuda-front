/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';

// 버튼에 적용할 스타일 정의
const buttonStyle = css`
  background-color: white;
  color: grey;
  border: none;
  border-bottom: 1px solid black;
  width: 320px;
  height: 40px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 5px;
  padding: 5px;
  padding-top: 7px;
  text-align: left;
`;

// 가운데 정렬 위한 코드
const buttonWrapperStyle = css`
  display: flex;
  justify-content: center;
`;

// Button 컴포넌트 정의
const SettingButton = ({ text, onClick, disabled }) => {
  return (
    <div css={buttonWrapperStyle}>
      <button css={buttonStyle} onClick={onClick} disabled={disabled}>
        {text}
      </button>
    </div>
  );
};

export default SettingButton;

/* 사용법

const handleClick = () => {
    console.log('버튼이 클릭되었습니다!');
};

<Button text="작성하기" onClick={handleClick} />;

<Button disabled={true} text="저장" />

*/
