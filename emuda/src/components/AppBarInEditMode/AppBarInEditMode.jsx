/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

var AppBarInEditMode = () => {
  const navigate = useNavigate();
  const onClickBtn = () => {
    navigate(-1);
  };
  return (
    <div css={BarStyle}>
      <button onClick={onClickBtn} css={ButtonStyle}>
        <IoIosArrowBack />
      </button>
      <div css={MainStyle}>일기</div>
      <div css={{ flex: 1 }} />
    </div>
  );
};

const BarStyle = css`
  position: related;
  background-color: white;
  height: 5.5vh;
  padding-top: 0.5vh;
  width: 100%;
  /* viewport height 대신 다른 단위를 사용할 수 있습니다. */
  display: flex;
  justify-content: space-between;
  align-items: stretch;
`;

const ButtonStyle = css`
  font-size: 150%;
  background-color: white;
  color: #3d96ff;
  width: 15%; /* 부모 너비에 의존 */
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  padding: 0;
  flex: 1;
  @media (min-width: 600px) {
    font-size: 30px;
    width: 10%;
    max-width: 60px;
  }
`;
const MainStyle = css`
  background-color: white;
  color: black;
  width: 70%; /* 부모 너비에 의존 */
  flex: 8;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
`;

export default AppBarInEditMode;
