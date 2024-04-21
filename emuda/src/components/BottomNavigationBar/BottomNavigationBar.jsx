/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { IoIosHome, IoIosMusicalNote, IoIosHeartEmpty } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import colors from '../../Colors/Colors';
const navBarStyle = css`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 15px 0 0 0;
  background-color: #fff;
  box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.1);
  z-index: 100;
  color: rgb(55, 104, 251);
  max-width: 800px;
  width: 100%;
  height: 50px;
  @media (max-width: 800px) {
    height: 30px;
  }
`;

const buttonStyle = (isSelected) => css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  padding: 10px 0;
  color: ${isSelected ? colors.mainBlue : colors.black};
`;

const BottomNavigationBarItem = ({ icon, label, route, isSelected }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(route);
  };

  return (
    <div onClick={handleClick} css={buttonStyle(isSelected)}>
      <div
        css={css`
          font-size: 30px;
        `}
      >
        {icon}
      </div>
      <div
        css={css`
          font-size: 12px;
        `}
      >
        {label}
      </div>
    </div>
  );
};

export const BottomNavigationBar = ({ current }) => {
  const items = [
    { label: '추천', route: '/recommend', icon: <IoIosHeartEmpty /> },
    { label: '홈', route: '/', icon: <IoIosHome /> },
    { label: '보관함', route: '/library', icon: <IoIosMusicalNote /> },
  ];

  return (
    <div css={navBarStyle}>
      {items.map((item) => (
        <BottomNavigationBarItem
          key={item.route}
          icon={item.icon}
          label={item.label}
          route={item.route}
          isSelected={current === item.route}
        />
      ))}
    </div>
  );
};

export default BottomNavigationBar;
