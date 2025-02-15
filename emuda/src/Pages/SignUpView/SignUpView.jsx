/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';
import AppBarInEditMode from '../../components/AppBarInEditMode/AppBarInEditMode';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { apiUrl } from '../../config/config';
import colors from '../../Colors/Colors';
import EyeIcon from '../../assets/EyeIcon';
import EyeOffIcon from '../../assets/EyeOffIcon';

const signupPageStyle = css`
  display: flex;
  width: 100%;
  margin: 0;
  padding: 50px 20px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #ffffff;
  font-family: 'Pretendard-Regular';
  box-sizing: border-box;
`;

const guideLabelStyle = css`
  font-family: 'Pretendard-SemiBold';
  color: ${colors.mainBlue};
  margin-bottom: 4px;
  font-size: 20px;
  width: 100%;
  text-align: left;
`;

const subGuideLabelStyle = css`
  font-family: 'Pretendard-Light';
  color: ${colors.lightGray03};
  margin-bottom: 68px;
  font-size: 15px;
  width: 100%;
  text-align: left;
`;

const formStyle = css`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const labelStyle = css`
  font-family: 'Pretendard-Medium';
  color: ${colors.lightGray03};
  margin-bottom: 5px;
  font-size: 14px;
`;

const labelStyle2 = css`
  margin-bottom: 5px;
  font-family: 'Pretendard-Light';
  color: ${colors.lightGray03};
  font-size: 10px;
  margin-left: 8px; // 첫 번째 라벨과의 간격 조정
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
  box-shadow: 0 4px 10px 0 ${error ? 'rgba(255, 103, 103, 0.2)' : 'rgba(151, 156, 162, 0.2)'};
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
`;

const nameInputContainerStyle = (error) => css`
  ${inputContainerStyle(error)};
  width: 70%;
`;

const idInputContainerStyle = (error) => css`
  ${inputContainerStyle(error)};
  width: 85%;
`;

const inputStyle = css`
  border: none;
  width: 100%;
  font-family: 'Pretendard-Regular';
  &:focus {
    outline: none;
  }
`;

const togglePasswordStyle = css`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
`;

const fixButtonBoxStyle = css`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignUpView = () => {
  const [formData, setFormData] = useState({
    name: '',
    id: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    name: false,
    id: false,
    password: false,
    confirmPassword: false,
  });
  const [showPassword, setShowPassword] = useState(false); // 비밀번호 가시성 상태 추가
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // 비밀번호 확인 가시성 상태 추가
  const navigate = useNavigate();

  const signup = async (requestBody) => {
    try {
      const response = await axios.post(`${apiUrl}/api/member/signup`, requestBody);
      return response.data;
    } catch (error) {
      console.error('회원가입 실패:', error);
      throw error;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let isError = false;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;
    if (name === 'name' && (value.length > 7 || value.length == 0)) isError = true;
    if (name === 'id' && (value.length < 5 || value.length > 10)) isError = true;
    if ((name === 'password' || name === 'confirmPassword') && !passwordRegex.test(value))
      isError = true;
    if (name === 'confirmPassword' && value !== formData.password) isError = true;
    setErrors((prev) => ({ ...prev, [name]: isError }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(formData).some((value) => value === '')) {
      alert('모든 필드를 입력해주세요.');
      return;
    }
    if (errors.name) {
      alert('닉네임은 7자 이하로 입력해주세요.');
      return;
    }
    if (errors.id) {
      alert('ID는 5~10자로 입력해주세요.');
      return;
    }
    if (errors.password) {
      alert('비밀번호는 8~16자로 입력해주세요(숫자, 영문자, 특수기호 포함).');
      return;
    }
    if (errors.confirmPassword || formData.password !== formData.confirmPassword) {
      alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    if (
      Object.values(errors).every((err) => !err) &&
      formData.password === formData.confirmPassword
    ) {
      const requestBody = {
        userID: formData.id,
        password: formData.password,
        nickname: formData.name,
      };

      try {
        const result = await signup(requestBody);

        if (result.isSuccess) {
          alert('회원가입 성공');
          navigate('/signupcom');
        } else {
          alert(`회원가입 실패: ${result.message}`);
        }
      } catch (error) {
        if (error.response) {
          console.error('회원가입 실패:', error.response.data);
          const errorMessage = error.response.data.message || '회원가입 문제가 발생했습니다.';
          alert(`${errorMessage}`);
        } else if (error.request) {
          alert('서버로부터 응답을 받지 못했습니다. 네트워크 상태를 확인해 주세요.');
        } else {
          alert('회원가입 중 오류가 발생했습니다.');
        }
      }
    }
  };

  return (
    <div css={signupPageStyle}>
      <AppBarInEditMode />
      <span css={guideLabelStyle}>회원가입</span>
      <span css={subGuideLabelStyle}>회원님의 정보를 등록해주세요!</span>
      <form css={formStyle} onSubmit={handleSubmit}>
        <div css={labelContainerStyle}>
          <label css={labelStyle}>닉네임</label>
          <label css={labelStyle2}> 7자 이하로 입력해주세요 </label>
        </div>
        <div css={nameInputContainerStyle(errors.name)}>
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
        <div css={idInputContainerStyle(errors.id)}>
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
          <div css={togglePasswordStyle} onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <EyeOffIcon strokeColor={colors.mainBlue} strokeOpacity={0.7} />
            ) : (
              <EyeIcon fillColor={colors.mainBlue} fillOpacity={0.7} />
            )}
          </div>
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
          <div
            css={togglePasswordStyle}
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <EyeOffIcon strokeColor={colors.mainBlue} strokeOpacity={0.7} />
            ) : (
              <EyeIcon fillColor={colors.mainBlue} fillOpacity={0.7} />
            )}
          </div>
        </div>
        <div css={fixButtonBoxStyle}>
          <Button text="회원가입" onClick={handleSubmit} />
        </div>
      </form>
    </div>
  );
};

export default SignUpView;
