/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { IoIosArrowBack, IoMdCreate, IoMdTrash } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

function AppBarInViewMode() {
  const navigate = useNavigate();
  const onClickBackBtn = () => {
    navigate('/main');
  };
  const onClickDeleteBtn = () => {
    navigate('/main');
  };
  const onClickEditBtn = () => {
    navigate('/edit');
  };

  return (
    <div css={BarStyle}>
      <button css={ButtonStyle} onClick={onClickBackBtn}>
        <IoIosArrowBack />
      </button>
      <div css={ButtonStyle}></div>
      <div css={MainStyle}>일기</div>
      <button css={ButtonStyle} onClick={onClickDeleteBtn}>
        <IoMdTrash />
      </button>
      <button css={ButtonStyle} onClick={onClickEditBtn}>
        <IoMdCreate />
      </button>
    </div>
  );
}

const BarStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: white;
  width: 100vw;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
`;

const MainStyle = css`
  background-color: white;
  color: black;
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonStyle = css`
  font-size: 5vw;
  background-color: white;
  color: #3d96ff;
  width: 15%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  padding: 0;

  @media (min-width: 600px) {
    font-size: 30px;
    width: 10%;
    max-width: 60px;
  }
`;

export default AppBarInViewMode;
