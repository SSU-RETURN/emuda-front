/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';

// 버튼에 적용할 스타일 정의
const buttonStyle = css`
  background-color: #3D96FF; 
  color: white;              
  border: none;              
  width: 360px;              
  height: 40px;              
  border-radius: 20px;       
  font-size: 16px;          
  cursor: pointer;           
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
  transition: background-color 0.3s; 

  &:hover {
    background-color: #3478E5; 
  }

  &:active {
    background-color: #2C65CC; 
  }
`;

// 가운데 정렬 위한 코드
const buttonWrapperStyle = css`
  display: flex;
  justify-content: center;
`;

// Button 컴포넌트 정의
const Button = ({ text, onClick }) => {
  return (
    <div css={buttonWrapperStyle}>
    <button css={buttonStyle} onClick={onClick}>
      {text}
    </button>
    </div>
  );
};

export default Button;

/* 사용법

const handleClick = () => {
    console.log('버튼이 클릭되었습니다!');
};

<Button text="작성하기" onClick={handleClick} />;
*/