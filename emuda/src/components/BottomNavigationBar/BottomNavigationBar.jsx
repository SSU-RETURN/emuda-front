/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import colors from '../../Colors/Colors';
import Home from '../../assets/bottomnavigationbar/home';
import Menu from '../../assets/bottomnavigationbar/menu';
import Recommend from '../../assets/bottomnavigationbar/recommend';

const navBarStyle = css`
  position: fixed;
  bottom: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 15px 0 20px 0;
  background-color: #fff;
  box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.1);
  z-index: 100;
  color: rgb(55, 104, 251);
  width: 100%;
  height: 70px;
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
        {React.cloneElement(icon, { color: isSelected ? colors.mainBlue : colors.black })}
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

export const BottomNavigationBar = ({ current = '/main' }) => {
  const items = [
    { label: '추천', route: '/recommend', icon: <Recommend /> },
    { label: '홈', route: '/main', icon: <Home /> },
    { label: '보관함', route: '/library', icon: <Menu /> },
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
