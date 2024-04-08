//deprecated : css 상속관계 어떻게 잡아야할지 모르겠어서 그냥 Bar이랑 합쳐버림

// import { css } from '@emotion/react';
// import { useNavigate } from 'react-router-dom';

// const buttonStyle = (isSelected) => css`
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   background-color: transparent; // 배경색 제거
//   border: none; // 테두리 제거
//   padding: 10px 0;
//   opacity: ${isSelected ? 1 : 0.6}; // 선택에 따른 불투명도 설정
// `;

// var BottomNavigationBarItem = ({ icon, label, route, isSelected, onSelect }) => {
//   const navigate = useNavigate();

//   return (
//     <div
//       onClick={() => {
//         onSelect();
//         navigate(route);
//       }}
//       css={buttonStyle(isSelected)}
//     >
//       {icon}
//       <div></div>
//       {label}
//     </div>
//   );
// };

// export default BottomNavigationBarItem;
