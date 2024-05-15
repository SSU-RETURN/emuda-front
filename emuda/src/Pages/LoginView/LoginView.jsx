/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';
import Logo from '../../assets/emuda_logo.svg';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';


const loginPageStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #ffffff;
`;

const loginFormStyle = css`
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 320px;
`;

const inputContainerStyle = css` 
  position: relative;
  padding: 12px 15px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 15px;
  width: 240;
`;

const inputStyle = css`
  border: none;
  width: 100%;
  font-family: 'Pretendard-Regular', sans-serif;
`;

const buttonStyle = css`
  background: none;
  border: none;
  cursor: pointer;
  font-family: 'Pretendard-Regular', sans-serif;
  color: #857979;
  justify-content: space-between;
  margin-top: 12px;
  width: 50%;
  margin: 20 70px; // 버튼 사이 간격
`;

const togglePasswordStyle = css`
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #ccc; 
`;

const LoginView = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ password: '' }); 
  const navigate = useNavigate(); 

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleClick = () => {
    console.log('로그인 버튼이 클릭되었습니다!');
    navigate('/preferstart');

  };

    // 밑에 작은 버튼들
  const Button_small = ({ text, onClick }) => {
    return (
      <button css={buttonStyle} onClick={onClick}>
        {text}
      </button>
    );
  };

    const handleSignup = () => {
      console.log('회원가입 버튼 클릭');
      navigate('/signup');

    };
  
    const handleFindIdPw = () => {
      console.log('ID/PW 찾기 버튼 클릭');
    };


  return (
    <div css={loginPageStyle}>
      <img src={Logo} alt="Emuda Logo" style={{ width: '120px', height: '120px', marginBottom: '30px' }} />
      <form css={loginFormStyle}>
        <div css={inputContainerStyle}>
          <input css={inputStyle} type="text" placeholder="ID" />
        </div>
        <div css={inputContainerStyle}>
          <input
            css={inputStyle}
            type= {showPassword ? 'text' : 'password'}
            placeholder='PW'
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <i
            css={togglePasswordStyle}
            className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>
        <Button text="로그인" onClick={handleClick} />
        <div>
          <Button_small text="회원가입" onClick={handleSignup} />
          <Button_small text="ID/PW 찾기" onClick={handleFindIdPw} />
        </div>
      </form>
    </div>
  );
};

export default LoginView;