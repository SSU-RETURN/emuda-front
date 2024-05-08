import React from 'react';

const Magnifyingglass = ({ fillColor, strokeColor }) => (
  <svg
    width="current"
    height="current"
    viewBox="0 0 22 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="7.5" cy="7.5" r="6.5" stroke={strokeColor} strokeWidth="2" />
    <path
      d="M19.5858 19.4141C19.9763 19.8047 20.6095 19.8047 21 19.4141C21.3905 19.0236 21.3905 18.3904 21 17.9999L19.5858 19.4141ZM21 17.9999L14 10.9999L12.5858 12.4141L19.5858 19.4141L21 17.9999Z"
      fill={fillColor}
    />
  </svg>
);

export default Magnifyingglass;
