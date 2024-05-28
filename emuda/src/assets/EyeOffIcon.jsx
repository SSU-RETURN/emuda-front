import React from 'react';

const EyeOffIcon = ({ strokeColor = 'black', strokeOpacity = 0.7 }) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2 2L22 22"
        stroke={strokeColor}
        strokeOpacity={strokeOpacity}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.71277 6.7226C3.66479 8.79527 2 12 2 12C2 12 5.63636 19 12 19C14.0503 19 15.8174 18.2734 17.2711 17.2884M11 5.05822C11.3254 5.02013 11.6588 5 12 5C18.3636 5 22 12 22 12C22 12 21.3082 13.3317 20 14.8335"
        stroke={strokeColor}
        strokeOpacity={strokeOpacity}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 14.2357C13.4692 14.7107 12.7684 14.9996 12 14.9996C10.3431 14.9996 9 13.6565 9 11.9996C9 11.1759 9.33193 10.4298 9.86932 9.8877"
        stroke={strokeColor}
        strokeOpacity={strokeOpacity}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default EyeOffIcon;
