/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import colors from '../../Colors/Colors';

var AppBarInEditMode = ({ text }) => {
  const navigate = useNavigate();
  const onClickBtn = () => {
    navigate(-1);
  };
  return (
    <div css={BarStyle}>
      <button onClick={onClickBtn} css={ButtonStyle}>
        <IoIosArrowBack />
      </button>
      <div css={MainStyle}>{text}</div>
      <div css={{ flex: 1 }} />
    </div>
  );
};

//사용 : <AppBarInEditMode text='일기 작성'/>

const BarStyle = css`
  position: related;
  background-color: white;
  height: 5vh;
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
  color: ${colors.darkBlue};
  width: 70%; /* 부모 너비에 의존 */
  flex: 8;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
`;

export default AppBarInEditMode;
