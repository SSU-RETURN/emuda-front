/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import AppBarInEditMode from '../../components/AppBarInEditMode/AppBarInEditMode';
import Logo from '../../assets/emuda_logo.svg';
import BottomNavigationBar from '../../components/BottomNavigationBar/BottomNavigationBar';
import SettingButton from '../../components/Button/SettingButton';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { apiUrl } from '../../config/config';

// Styles
const containerStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 0;
  max-width: 800px;
  width: 100%;
  height: 80vh;
  overflow: hidden;
  box-sizing: border-box;
  body {
    margin: 0;
    padding: 0;
  }
  font-family: 'Pretendard-Medium';
`;

const contentStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  flex-grow: 1;
  margin-top: 20px;
  text-align: center;
  width: 100%;
  height: 100%;
`;

const imageStyle = css`
  height: 100px;
  width: 100px;
  border-radius: 60px;
  border: 1px solid black;
  margin-bottom: 10px;
`;

// Component
const SettingView = () => {
  const navigate = useNavigate();

  const withdrawal = async (memberId) => {
    try {
      const response = await axios.delete(`${apiUrl}/api/member/delete`, { params: { memberId } });
      return response.data;
    } catch (error) {
      console.error('회원탈퇴 요청 실패:', error);
      throw error;
    }
  };

  let nickname = '서윤하';

  const handleLogOut = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleWithdrawal = async () => {
    const memberId = Number(localStorage.getItem('memberId'));

    try {
      const loginResult = await withdrawal(memberId);
      console.log('회원탈퇴 성공');
      if (loginResult.isSuccess) {
        localStorage.clear();
        navigate('/login');
      } else {
        alert(`회원탈퇴 실패: ${loginResult.message}`);
      }
    } catch (error) {
      if (error.response) {
        console.error('회원탈퇴 실패:', error.response.data);
        const errorMessage = error.response.data.message || '회원탈퇴 중 문제가 발생했습니다.';
        alert(`${errorMessage}`);
      } else if (error.request) {
        alert('서버로부터 응답을 받지 못했습니다. 네트워크 상태를 확인해 주세요.');
      } else {
        alert('회원탈퇴 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div css={containerStyle}>
      <AppBarInEditMode text="마이페이지" />
      <div css={contentStyle}>
        <img src={Logo} css={imageStyle} />
        <span>{nickname}님</span>
        <SettingButton text="회원 정보 수정" onClick={null}></SettingButton>
        <SettingButton text="로그아웃" onClick={handleLogOut}></SettingButton>
        <SettingButton text="탈퇴하기" onClick={handleWithdrawal}></SettingButton>
        <SettingButton text="노래취향 재설정" onClick={null}></SettingButton>
      </div>
      <BottomNavigationBar current="/home"></BottomNavigationBar>
    </div>
  );
};

export default SettingView;
