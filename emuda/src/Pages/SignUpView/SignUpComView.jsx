/** @jsxImportSource @emotion/react */
import React from 'react';
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

const SignUpComView = () => {
    const navigate = useNavigate();

    const handleGoToLogin = () => {
        navigate('/login');
    };

  return (
    <div css={pageStyle}>
    {/* <img src={Logo} alt="Emuda Logo" style={{ width: '132px', height: '143px', marginBottom: '30px' }} /> */}
    <div css={logoContainerStyle}>
        <img src={Logo} alt="Emuda Logo" style={{ width: '100%', height: '100%' }} />
        <div css={logoTextStyle}>EMUDA</div>
    </div>
      <h1 css={firstTextStyle}>가입이 완료되었습니다!</h1>
      <Button text="로그인 하러 가기" onClick={handleGoToLogin} />
    </div>
  );
};

export default SignUpComView;
