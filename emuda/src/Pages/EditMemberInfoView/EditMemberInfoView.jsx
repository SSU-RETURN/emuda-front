/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBarInEditMode from '../../components/AppBarInEditMode/AppBarInEditMode';
import Person_circle_fill from '../../assets/person_circle_fill.svg';
import '../../Fonts/Font.css';
import Button from '../../components/Button/Button';
import colors from '../../Colors/Colors';
import EyeIcon from '../../assets/EyeIcon';
import EyeOffIcon from '../../assets/EyeOffIcon';
import axios from 'axios';
import { apiUrl } from '../../config/config';

const Container = ({ children }) => {
  return <div css={containerStyle}>{children}</div>;
};

const containerStyle = css`
  width: 100%;
  display: flex;
  padding: 70px 0px;
  flex-direction: column;
  align-items: center;
  margin: 0px;
`;

const fixTopBoxStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 63px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const profileImageStyle = css`
  height: 100px;
  width: 100px;
  margin-bottom: 15px;
`;

const subContainerStyle = css`
  margin: 16px 0px;
  padding: 25px 16px;
  box-sizing: border-box;
  height: auto;
  width: calc(100% - 20px);
  border-radius: 7px;
  box-shadow: 0px 4px 10px 0px rgba(110, 110, 110, 0.2);
`;

const subTitleStyle = css`
  font-family: 'Pretendard-SemiBold';
  display: block;
  width: 100%;
  text-align: start;
  font-size: 16px;
  margin-bottom: 16px;
`;

const nickNameBoxStyle = css`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const inputContainerStyle = css`
  position: relative;
  width: 100%;
`;

const inputStyle = css`
  border-radius: 5px;
  display: inline;
  width: 100%;
  border: 1px solid ${colors.lightGray03};
  height: 42px;
  font-family: 'Pretendard-Regular';
  outline: none;
  box-shadow: none;
  margin-bottom: 16px;
  padding: 0px 7px 0px 7px;
  box-sizing: border-box;

  &::placeholder {
    color: ${colors.lightGray04};
  }
`;

const labelSpanStyle = css`
  font-family: 'Pretendard-Light';
  color: ${colors.lightGray03};
  width: auto;
  white-space: nowrap;
  text-align: start;
  font-size: 12px;
  margin-bottom: 16px;
  margin-right: 10px;
`;

const idSpanStyle = css`
  font-family: 'Pretendard-Light';
  color: ${colors.lightGray03};
  width: 100%;
  display: block;
  text-align: start;
  font-size: 12px;
  margin-bottom: 7px;
  margin-left: 24px;
`;

const passwordSpanStyle = css`
  font-family: 'Pretendard-Light';
  color: ${colors.lightGray03};
  width: 100%;
  display: block;
  text-align: start;
  font-size: 12px;
  margin-bottom: 7px;
`;

const saveButtonBoxStyle = css`
  width: 100%;
  display: flex;
  justify-content: right;
`;

const buttonStyle = css`
  background-color: ${colors.mainBlue};
  color: white;
  border: none;
  width: 30%;
  height: 36px;
  border-radius: 10px;
  font-size: 15px;
  font-family: 'Pretendard-Medium';

  &:disabled {
    background-color: ${colors.lightGray04};
    color: black;
  }
`;

const fixButtonBoxStyle = css`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 -1px 4px -1px ${colors.lightGray01};
`;

const togglePasswordVisibilityStyle = css`
  position: absolute;
  top: 40%;
  right: 8px;
  transform: translateY(-50%);
  cursor: pointer;
`;

const EditMemberInfoView = () => {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [nickName, setNickName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [checkNewPassword, setCheckNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showCheckNewPassword, setShowCheckNewPassword] = useState(false);

  const isValidNickname = (nickname) => nickname.length <= 7;
  const isValidPassword = (password) =>
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/.test(password);

  const isNickNameSaveEnabled = isValidNickname(nickName);
  const isPasswordSaveEnabled = isValidPassword(newPassword) && newPassword === checkNewPassword;

  useEffect(() => {
    const storedId = localStorage.getItem('id');
    if (storedId) {
      setId(storedId);
    }
  }, []);

  const updateNickname = async (requestBody) => {
    try {
      const response = await axios.put(`${apiUrl}/api/member/nickname`, requestBody);
      return response.data;
    } catch (error) {
      window.alert('닉네임 수정 실패: ' + error.message);
      throw error;
    }
  };

  const updatePassword = async (requestBody) => {
    try {
      const response = await axios.put(`${apiUrl}/api/member/passwd`, requestBody);
      return response.data;
    } catch (error) {
      window.alert('비밀번호 수정 실패: ' + error.message);
      throw error;
    }
  };

  const handleSaveNicknameClick = async () => {
    const memberId = localStorage.getItem('memberId');
    const requestBody = {
      memberId: Number(memberId),
      newNickname: nickName,
    };
    try {
      const result = await updateNickname(requestBody);
      if (result.isSuccess) {
        alert('닉네임 수정이 완료되었습니다.');
        localStorage.setItem('nickname', nickName);
      } else {
        alert(`닉네임 수정 실패: ${result.message}`);
      }
    } catch (error) {
      if (error.response) {
        console.error('닉네임 수정 실패:', error.response.data);
        const errorMessage = error.response.data.message || '닉네임 수정 문제가 발생했습니다.';
        alert(`${errorMessage}`);
      } else if (error.request) {
        alert('서버로부터 응답을 받지 못했습니다. 네트워크 상태를 확인해 주세요.');
      } else {
        alert('닉네임 수정 중 오류가 발생했습니다.');
      }
    }
  };

  const handleSavePasswordClick = async () => {
    const memberId = localStorage.getItem('memberId');
    const requestBody = {
      memberId: Number(memberId),
      newPasswd: newPassword,
    };

    try {
      const result = await updatePassword(requestBody);
      if (result.isSuccess) {
        alert('비밀번호 수정이 완료되었습니다.');
      } else {
        alert(`비밀번호 수정 실패: ${result.message}`);
      }
    } catch (error) {
      if (error.response) {
        console.error('비밀번호 수정 실패:', error.response.data);
        const errorMessage = error.response.data.message || '비밀번호 수정 문제가 발생했습니다.';
        alert(`${errorMessage}`);
      } else if (error.request) {
        alert('서버로부터 응답을 받지 못했습니다. 네트워크 상태를 확인해 주세요.');
      } else {
        alert('비밀번호 수정 중 오류가 발생했습니다.');
      }
    }
  };
  const handleCompleteClick = async () => {
    navigate(-1);
  };

  return (
    <Container>
      <div css={fixTopBoxStyle}>
        <AppBarInEditMode text="회원정보 수정" />
      </div>
      <img src={Person_circle_fill} css={profileImageStyle} />
      <div css={subContainerStyle}>
        <span css={subTitleStyle}>내 정보</span>
        <div css={nickNameBoxStyle}>
          <span css={labelSpanStyle}>닉네임</span>
          <input
            css={inputStyle}
            type="text"
            name="userNickName"
            placeholder="7자 이하로 입력해 주세요"
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
          />
        </div>
        <div css={nickNameBoxStyle}>
          <span css={labelSpanStyle}>ID</span>
          <span css={idSpanStyle}>{id}</span>
        </div>
        <div css={saveButtonBoxStyle}>
          <button
            css={buttonStyle}
            onClick={handleSaveNicknameClick}
            disabled={!isNickNameSaveEnabled}
          >
            저장
          </button>
        </div>
      </div>
      <div css={subContainerStyle}>
        <span css={subTitleStyle}>비밀번호 설정</span>
        <span css={passwordSpanStyle}>새 비밀번호</span>
        <div css={inputContainerStyle}>
          <input
            css={inputStyle}
            type={showNewPassword ? 'text' : 'password'}
            name="newPassword"
            placeholder="8~16자 (숫자, 영문자, 특수기호 포함)"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <div
            css={togglePasswordVisibilityStyle}
            onClick={() => setShowNewPassword(!showNewPassword)}
          >
            {showNewPassword ? (
              <EyeOffIcon strokeColor="black" strokeOpacity={0.7} />
            ) : (
              <EyeIcon fillColor="black" fillOpacity={0.7} />
            )}
          </div>
        </div>
        <span css={passwordSpanStyle}>새 비밀번호 확인</span>
        <div css={inputContainerStyle}>
          <input
            css={inputStyle}
            type={showCheckNewPassword ? 'text' : 'password'}
            name="checkNewPassword"
            placeholder="8~16자 (숫자, 영문자, 특수기호 포함)"
            value={checkNewPassword}
            onChange={(e) => setCheckNewPassword(e.target.value)}
          />
          <div
            css={togglePasswordVisibilityStyle}
            onClick={() => setShowCheckNewPassword(!showCheckNewPassword)}
          >
            {showCheckNewPassword ? (
              <EyeOffIcon strokeColor="black" strokeOpacity={0.7} />
            ) : (
              <EyeIcon fillColor="black" fillOpacity={0.7} />
            )}
          </div>
        </div>
        <div css={saveButtonBoxStyle}>
          <button
            css={buttonStyle}
            onClick={handleSavePasswordClick}
            disabled={!isPasswordSaveEnabled}
          >
            저장
          </button>
        </div>
      </div>
      <div css={fixButtonBoxStyle}>
        <Button text="완료" onClick={handleCompleteClick} />
      </div>
    </Container>
  );
};

export default EditMemberInfoView;
