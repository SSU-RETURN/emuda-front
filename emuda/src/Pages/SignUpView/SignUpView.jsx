/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';
import Logo from '../../assets/emuda_logo.svg';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';

const signupPageStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #ffffff;
  font-family: 'Pretendard-Regular', sans-serif;
`;

const formStyle = css`
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 350px;
`;

const labelStyle = css`
  margin-bottom: 5px;
  font-size: 14px;
`;

const labelStyle2 = css`
  margin-bottom: 5px;
  font-size: 10px;
  margin-left: 10px; // 첫 번째 라벨과의 간격 조정
`;
const labelContainerStyle = css`
  display: flex;
  align-items: center; // 라벨들이 중앙 정렬되도록 합니다.
  margin-bottom: 5px;
`;


const inputContainerStyle = (error) => css` 
  position: relative;
  padding: 12px 15px;
  margin-bottom: 20px;

  border: 1px solid ${error ? 'red' : '#ccc'};
  border-radius: 15px;
  width: 270px;
`;

const inputStyle = css`
  border: none;
  width: 100%;
  font-family: 'Pretendard-Regular', sans-serif;
`;

const togglePasswordStyle = css`
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
`;

const SignUpView = () => {
  const [formData, setFormData] = useState({
    name: '',
    id: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({
    name: false,
    id: false,
    password: false,
    confirmPassword: false
  });
  const [showPassword, setShowPassword] = useState(false); // 비밀번호 가시성 상태 추가
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // 비밀번호 확인 가시성 상태 추가
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let isError = false;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;
    if (name === 'name' && (value.length > 7 || value.length == 0)) isError = true;
    if (name === 'id' && (value.length < 5 || value.length > 10)) isError = true;
    if ((name === 'password' || name === 'confirmPassword') && !passwordRegex.test(value)) isError = true;
    if (name === 'confirmPassword' && value !== formData.password) isError = true;
    setErrors(prev => ({ ...prev, [name]: isError }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(errors).every(err => !err) && formData.password === formData.confirmPassword) {
      console.log('Form data submitted:', formData);
      navigate('/signupcom');
    } else {
      console.log('Please correct the errors before submitting.');
    }
  };

  return (
    <div css={signupPageStyle}>
      <img src={Logo} alt="Emuda Logo" style={{ width: '120px', height: '120px', marginBottom: '30px' }} />
      <form css={formStyle} onSubmit={handleSubmit}>
        <div css={labelContainerStyle}>
          <label css={labelStyle}>닉네임</label>
          <label css={labelStyle2}> 7자 이하로 입력해주세요 </label>
          </div>
          <div css={inputContainerStyle(errors.name)}>
            <input
              css={inputStyle}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
        <div css={labelContainerStyle}>
          <label css={labelStyle}>ID</label>
          <label css={labelStyle2}>5~10자로 입력해주세요</label>
          </div>
          <div css={inputContainerStyle(errors.id)}>
            <input
              css={inputStyle}
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
            />
          </div>
        <div css={labelContainerStyle}>
          <label css={labelStyle}>비밀번호</label>
          <label css={labelStyle2}>8~16자로 입력해주세요(숫자, 영문자, 특수기호 포함)</label>
          </div>
          <div css={inputContainerStyle(errors.password)}>
            <input
              css={inputStyle}
              type={showPassword ? 'text' : 'password'}
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
        <div css={labelContainerStyle}>
          <label css={labelStyle}>비밀번호 확인</label>
          </div>
          <div css={inputContainerStyle(errors.confirmPassword)}>
            <input
              css={inputStyle}
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <i
              css={togglePasswordStyle}
              className={`fa ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          </div>
        <Button text="회원가입" onClick={handleSubmit} />
      </form>
    </div>
  );
};

export default SignUpView;
