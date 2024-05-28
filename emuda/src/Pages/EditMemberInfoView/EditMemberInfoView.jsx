/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';
import AppBarInEditMode from '../../components/AppBarInEditMode/AppBarInEditMode';
import Person_circle_fill from '../../assets/person_circle_fill.svg';
import '../../Fonts/Font.css';
import Button from '../../components/Button/Button';
import colors from '../../Colors/Colors';
import EyeIcon from '../../assets/EyeIcon';
import EyeOffIcon from '../../assets/EyeOffIcon';

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
`;

const EditMemberInfoView = () => {
  const [nickName, setNickName] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [checkNewPassword, setCheckNewPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showCheckNewPassword, setShowCheckNewPassword] = useState(false);

  const isNickNameSaveEnabled = nickName.length > 0;
  const isPasswordSaveEnabled =
    currentPassword.length > 0 && newPassword.length > 0 && checkNewPassword.length > 0;

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
          <span css={idSpanStyle}>123adfadf</span>
        </div>
        <div css={saveButtonBoxStyle}>
          <button
            css={buttonStyle}
            onClick={() => console.log('닉네임 저장')}
            disabled={!isNickNameSaveEnabled}
          >
            저장
          </button>
        </div>
      </div>
      <div css={subContainerStyle}>
        <span css={subTitleStyle}>비밀번호 설정</span>
        <span css={passwordSpanStyle}>현재 비밀번호</span>
        <div css={inputContainerStyle}>
          <input
            css={inputStyle}
            type={showCurrentPassword ? 'text' : 'password'}
            name="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <div
            css={togglePasswordVisibilityStyle}
            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
          >
            {showCurrentPassword ? (
              <EyeOffIcon strokeColor="black" strokeOpacity={0.7} />
            ) : (
              <EyeIcon fillColor="black" fillOpacity={0.7} />
            )}
          </div>
        </div>
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
            onClick={() => console.log('비밀번호 저장')}
            disabled={!isPasswordSaveEnabled}
          >
            저장
          </button>
        </div>
      </div>
      <div css={fixButtonBoxStyle}>
        <Button text="완료" onClick={() => console.log('완료 클릭')} />
      </div>
    </Container>
  );
};

export default EditMemberInfoView;
