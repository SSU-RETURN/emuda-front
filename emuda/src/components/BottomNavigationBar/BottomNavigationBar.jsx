// BottomNavigationBar.jsx
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { IoIosHome, IoIosMusicalNote, IoIosHeartEmpty } from 'react-icons/io';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const navBarStyle = css`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #fff; // 네비게이션 바의 배경색
  padding: 10px 0;
  box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.1); // 상단 그림자 효과
  z-index: 100; // 다른 컨텐츠 위에 표시되도록 z-index 설정
  color: rgb(55, 104, 251);
`;

//여기서 isSelected가 전달되면서 css가 상속되는구나..
const buttonStyle = (isSelected) => css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: transparent; // 배경색 제거
  border: none; // 테두리 제거
  padding: 10px 0;
  color: ${isSelected ? 'rgba(61, 150, 255, 1)' : 'rgb(0,0,0)'}; // 선택에 따른 불투명도 설정
`;

var BottomNavigationBarItem = ({ icon, label, route, isSelected, onSelect }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        onSelect();
        navigate(route);
      }}
      css={buttonStyle(isSelected)}
    >
      <div
        css={css`
          font-size: 30px;
        `}
      >
        {icon}
      </div>
      <div></div>
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
function BottomNavigationBar() {
  const [selected, setSelected] = useState('/'); // 기본 선택된 경로

  //이거 이후에 그냥 item도 다른거로 입력받아도 괜찮음
  const items = [
    { label: '추천', route: '/profile', icon: <IoIosHeartEmpty /> },
    { label: '홈', route: '/', icon: <IoIosHome /> },
    { label: '보관함', route: '/search', icon: <IoIosMusicalNote /> },
  ];

  const handleSelect = (route) => {
    setSelected(route); // 선택된 경로 업데이트
  };

  return (
    <div css={navBarStyle}>
      {items.map((item) => (
        <BottomNavigationBarItem
          key={item.route}
          icon={item.icon}
          label={item.label}
          route={item.route}
          isSelected={selected === item.route}
          onSelect={() => handleSelect(item.route)}
        />
      ))}
    </div>
  );
}

export default BottomNavigationBar;
