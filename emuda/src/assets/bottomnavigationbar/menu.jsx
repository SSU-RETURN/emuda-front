import React from 'react';

const Menu = ({ color = 'black' }) => {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_117_2498)">
        <path
          d="M1.35606 15.8284H12.2319C12.6942 15.8284 13.0592 15.4634 13.0592 15.0011C13.0592 14.551 12.6821 14.186 12.2319 14.186H1.35606C0.893772 14.186 0.528809 14.551 0.528809 15.0011C0.528809 15.4634 0.881606 15.8284 1.35606 15.8284Z"
          fill={color}
          fillOpacity="0.85"
        />
        <path
          d="M1.35606 11.4975H12.2319C12.6942 11.4975 13.0592 11.1204 13.0592 10.6581C13.0592 10.208 12.6821 9.85522 12.2319 9.85522H1.35606C0.893772 9.85522 0.528809 10.208 0.528809 10.6581C0.528809 11.1204 0.881606 11.4975 1.35606 11.4975Z"
          fill={color}
          fillOpacity="0.85"
        />
        <path
          d="M1.35606 7.16675H12.2319C12.6821 7.16675 13.0592 6.78962 13.0592 6.3395C13.0592 5.88938 12.6821 5.52441 12.2319 5.52441H1.35606C0.893772 5.52441 0.528809 5.88938 0.528809 6.3395C0.528809 6.78962 0.893772 7.16675 1.35606 7.16675Z"
          fill={color}
          fillOpacity="0.85"
        />
        <path
          d="M25.3341 6.59489V2.02068C25.3341 1.37592 24.811 0.962296 24.1905 1.08395L17.9375 2.44648C17.1589 2.6168 16.7332 3.04259 16.7332 3.72385L16.7574 17.2518C16.8184 17.8479 16.5386 18.2372 16.0033 18.3467L14.0689 18.7481C11.6359 19.2591 10.4923 20.5 10.4923 22.337C10.4923 24.1982 11.9278 25.5 13.9473 25.5C15.7356 25.5 18.412 24.1861 18.412 20.646V9.51459C18.412 8.86982 18.5336 8.736 19.1054 8.61435L24.665 7.39781C25.0786 7.31265 25.3341 6.99634 25.3341 6.59489Z"
          fill={color}
          fillOpacity="0.85"
        />
      </g>
      <defs>
        <clipPath id="clip0_117_2498">
          <rect width="25.2554" height="25" fill="white" transform="translate(0.528809 0.5)" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Menu;
