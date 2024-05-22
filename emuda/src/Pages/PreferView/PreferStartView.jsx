/** @jsxImportSource @emotion/react */
import { React, useState, useEffect } from 'react';
import { css } from '@emotion/react';
import Button from '../../components/Button/Button';
import colors from '../../Colors/Colors';
import Logo from '../../assets/emuda_logo.svg';
import { useNavigate } from 'react-router-dom';

const pageStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  //   justify-content: flex-start;
  align-items: center;
  margin: 0 auto;
  padding: 0;
  max-width: 800px;
  width: 100%;
  height: 100vh;
  font-family: 'Pretendard-Medium';
  align-items: center;
`;
const logoContainerStyle = css`
  position: relative;
  width: 132px;
  height: 143px;
  margin-bottom: 30px;
`;

const logoTextStyle = css`
  position: absolute;
  top: 55%;
  left: 48%;
  transform: translate(-50%, -50%);
  font-size: 17px;
  color: ${colors.black};
  text-align: center;
  font-family: 'Pretendard-SemiBold';
`;

const firstTextStyle = css`
  font-size: 20px;
  color: ${colors.black};
  text-align: center;
  margin-bottom: 20px;
  font-family: 'Pretendard-SemiBold';
`;

const secondTextStyle = css`
  font-size: 12px;
  color: ${colors.black};
  text-align: center;
  margin-bottom: 50px;
  font-family: 'Pretendard-light';
`;

const skipButtonStyle = css`
  width: 94px;
  height: 19px;
  background-color: white;
  border: none;
  font-size: 14px;
  cursor: pointer;
  margin-top: 30px;
  color: #857979;
`;
const PreferStart = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    const storedNickname = localStorage.getItem('nickname');
    if (storedNickname) {
      setNickname(storedNickname);
    }
  }, []);

  const handleNextClick = () => {
    navigate('/preferfirst');
  };

  const handleSkip = () => {
    navigate('/main'); // Update this line to navigate to the Main view
  };

  return (
    <div css={pageStyle}>
      {/* <img src={Logo} alt="Emuda Logo" style={{ width: '132px', height: '143px', marginBottom: '30px' }} /> */}
      <div css={logoContainerStyle}>
        <img src={Logo} alt="Emuda Logo" style={{ width: '100%', height: '100%' }} />
        <div css={logoTextStyle}>EMUDA</div>
      </div>
      <h1 css={firstTextStyle}>{nickname}님 환영합니다!</h1>
      <p css={secondTextStyle}>
        더 정확한 노래 추천을 위해
        <br />
        00님의 취향을 입력해주세요
      </p>
      <Button text="다음" onClick={handleNextClick} />
      <button css={skipButtonStyle} onClick={handleSkip}>
        건너뛰기
      </button>
    </div>
  );
};
export default PreferStart;
