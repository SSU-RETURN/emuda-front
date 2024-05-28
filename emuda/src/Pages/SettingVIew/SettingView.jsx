/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import AppBarInEditMode from '../../components/AppBarInEditMode/AppBarInEditMode';
import Person_circle_fill from '../../assets/person_circle_fill.svg';
import Person_fill_badge_minus from '../../assets/person_fill_badge_minus.svg';
import Person_fill from '../../assets/person_fill.svg';
import Person_slash_fill from '../../assets/person_slash_fill.svg';
import Music_note from '../../assets/music_note.svg';
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
  margin: 0;
  padding: 50px 0px;
  max-width: 800px;
  width: 100%;
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
  margin-left: 20px;
  text-align: center;
  width: 100%;
  box-sizing: border-box;
`;

const nameSpanStyle = css`
  font-family: 'Pretendard-Light';
  font-size: 15px;
  margin-bottom: 18px;
`;

const subTitleStyle = css`
  font-family: 'Pretendard-Light';
  width: 100%;
  text-align: start;
  font-size: 11px;
  margin: 15px 0px 8px 8px;
`;

const imageStyle = css`
  height: 100px;
  width: 100px;
  border-radius: 50px;
  margin-bottom: 10px;
`;

// Component
const SettingView = () => {
  const navigate = useNavigate();

  let nickname = localStorage.getItem('nickname');

  const withdrawal = async (memberId) => {
    try {
      const response = await axios.delete(`${apiUrl}/api/member/delete`, { params: { memberId } });
      return response.data;
    } catch (error) {
      console.error('회원탈퇴 요청 실패:', error);
      throw error;
    }
  };
  const handleEditMemberInfo = () => {
    navigate('/editMemberInfo');
  };

  const handleLogOut = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleWithdrawal = async () => {
    const memberId = Number(localStorage.getItem('memberId'));

    const confirmWithdrawal = window.confirm('정말 탈퇴하시겠습니까?');
    if (!confirmWithdrawal) {
      return;
    }

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

  const handleRePreference = () => {
    navigate('/preferfirst', { state: { reSetting: true } });
  };

  return (
    <div css={containerStyle}>
      <AppBarInEditMode text="마이페이지" />
      <div css={contentStyle}>
        <img src={Person_circle_fill} css={imageStyle} />
        <span css={nameSpanStyle}>{nickname}님</span>
        <span css={subTitleStyle}>사용자 정보</span>
        <SettingButton
          icon={Person_fill}
          text="회원 정보 수정"
          onClick={handleEditMemberInfo}
          hasArrow={true}
        ></SettingButton>
        <span css={subTitleStyle}>계정</span>
        <SettingButton
          icon={Person_fill_badge_minus}
          text="로그아웃"
          onClick={handleLogOut}
          hasArrow={false}
        ></SettingButton>
        <SettingButton
          icon={Person_slash_fill}
          text="탈퇴하기"
          onClick={handleWithdrawal}
          hasArrow={false}
        />
        <span css={subTitleStyle}>기타</span>
        <SettingButton
          icon={Music_note}
          text="노래취향재설정"
          onClick={handleRePreference}
          hasArrow={true}
        />
      </div>
      <BottomNavigationBar current="/home"></BottomNavigationBar>
    </div>
  );
};

export default SettingView;
