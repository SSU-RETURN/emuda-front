/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import colors from '../../Colors/Colors';
import Chevron_right from '../../assets/chevron_right.svg';

// 버튼에 적용할 스타일 정의
const buttonStyle = css`
  background-color: white;
  color: grey;
  border: none;
  border-bottom: 1px solid ${colors.lightGray04};
  width: 100%;
  height: 59px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 5px;
  padding: 5px;
  padding-top: 7px;
  text-align: left;
  display: flex;
  align-items: center;
`;

// 가운데 정렬 위한 코드
const buttonWrapperStyle = css`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const iconStyle = css`
  width: 24px;
  height: 24px;
  padding: 4px;
  background-color: ${colors.mainBlue};
  margin-right: 12px;
  box-sizing: border-box;
  border-radius: 3px;
`;
const spanStyle = css`
  display: flex;
  font-family: 'Pretendard-Light';
  font-size: 15px;
`;

const arrowStyle = css`
  margin-left: auto;
  margin-right: 20px;
  height: 16px;
`;

// Button 컴포넌트 정의
const SettingButton = ({ icon, text, onClick, disabled, hasArrow }) => {
  return (
    <div css={buttonWrapperStyle}>
      <button css={buttonStyle} onClick={onClick} disabled={disabled}>
        <img src={icon} alt={text} css={iconStyle} />
        <span css={spanStyle}>{text}</span>
        {hasArrow && <img src={Chevron_right} css={arrowStyle} />}
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
