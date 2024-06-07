/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Logo from '../../assets/emuda_logo.svg';
import Person_circle_fill from '../../assets/person_circle_fill.svg';
import colors from '../../Colors/Colors';
import { useNavigate } from 'react-router-dom';
var AppBarInMainScreen = () => {
  const navigate = useNavigate();
  return (
    <div css={BarStyle}>
      <button css={ButtonStyle} onClick={() => navigate('/main')}>
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
  position: fixed;
  top: 0px;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: white;
  height: 60px;
  padding: 13px 22px;
  width: 100%;
  box-sizing: border-box;
  aspect-ratio: 6 / 1;
  /* viewport height 대신 다른 단위를 사용할 수 있습니다. */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const imgStyle = css`
  height: 37px;
  width: 37px;
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
