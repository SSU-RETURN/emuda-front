/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import emotionStyles2 from '../../components/EmotionStyles/EmotionStyles2.jsx';

const containerStyle = css`
  display: flex;
  flex-direction: row;
  width: 85%;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  gap: 10px;
`;

const barStyle = css`
  flex-direction: column;
  justify-content: space-around;
`;

const selectedEmotionStyle = css`
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.4);
`;

const SelectEmotionBar = ({ onEmotionSelect, selectedEmotion }) => {
  const emotions = [
    { name: 'SAD', displayName: '슬퍼요' },
    { name: 'HAPPY', displayName: '기뻐요' },
    { name: 'ANGRY', displayName: '화나요' },
    { name: 'ROMANCE', displayName: '설레요' },
    { name: 'ANXIETY', displayName: '불안해요' },
  ];

  return (
    <div css={containerStyle}>
      {emotions.map((emotion) => (
        <div css={[barStyle]} key={emotion.name}>
          <div
            css={css`
              ${emotionStyles2[emotion.name]};
              ${emotion.name === selectedEmotion ? selectedEmotionStyle : ''};
            `}
            onClick={() => onEmotionSelect(emotion.name)}
            aria-label={emotion.displayName}
          />
          <span
            css={css`
              font-size: 10px;
              font-family: 'Pretendard-Medium';
              opacity: ${emotion.name === selectedEmotion ? 0.7 : 0.5};
            `}
          >
            {emotion.displayName}
          </span>
        </div>
      ))}
    </div>
  );
};

export default SelectEmotionBar;
