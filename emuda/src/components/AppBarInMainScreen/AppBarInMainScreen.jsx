/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Logo from '../../assets/emuda_logo.svg';
import Person_circle_fill from '../../assets/person_circle_fill.svg';
import colors from '../../Colors/Colors';
import { useNavigate } from 'react-router-dom';
var AppBarInMainScreen = () => {
  const navigate = useNavigate();
  return (
    <div css={BarStyle} onClick={() => navigate('/main')}>
      <button css={ButtonStyle}>
        <img css={imgStyle} src={Logo} />
      </button>
      <div css={MainStyle}>
        <span>EMUDA</span>
      </div>
      <button css={ButtonStyle} onClick={() => navigate('/setting')}>
        <img src={Person_circle_fill} css={personImageStyle} />
      </button>
    </div>
  );
};
const BarStyle = css`
  position: related;
  background-color: white;
  height: 5vh;
  padding-top: 1.5vh;
  padding-bottom: 1.5vh;
  width: 100%;
  /* viewport height 대신 다른 단위를 사용할 수 있습니다. */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const imgStyle = css`
  height: 5vh;
  width: 5vh;
`;
const MainStyle = css`
  background-color: white;
  color: black;
  flex: 8;
  display: flex;
  justify-content: start;
  padding-left: 5px;
  align-items: center;
  & span {
    margin-left: 10px;
    font-family: 'Pretendard-Semibold';
    font-size: 16px;
    transform: scaleX(1.2);
  }
  @media (min-width: 800px) {
    font-size: 30px;
  }
`;
const personImageStyle = css`
  width: 30px;
  height: 30px;
`;
const ButtonStyle = css`
  background-color: white;
  color: ${colors.mainBlue};
  width: 15%; /* 부모 너비에 의존 */
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  padding: 0;
  flex: 1;
  font-size: 40px;
  @media (min-width: 800px) {
    font-size: 45px;
  }
`;

export default AppBarInMainScreen;
