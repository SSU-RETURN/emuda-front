/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import emotionStyles from '../../components/EmotionStyles/EmotionStyles';

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
  cursor: pointer;
`;

const SelectEmotionBar = ({ onEmotionSelect, selectedEmotion }) => {
  const emotions = [
    { name: 'sad', displayName: '슬퍼요' },
    { name: 'happy', displayName: '기뻐요' },
    { name: 'anxiety', displayName: '불안해요' },
    { name: 'exciting', displayName: '설레요' },
    { name: 'angry', displayName: '화나요' },
  ];

  return (
    <div css={containerStyle}>
      {emotions.map((emotion) => (
        <div
          css={[
            barStyle,
            emotion.name === selectedEmotion &&
              css`
                opacity: 1;
              `,
          ]}
          key={emotion.name}
        >
          <div
            css={css`
              ${emotionStyles[emotion.name]},
              color:emotion.name===selectedEmotion ? #000000 : #666666
            `}
            onClick={() => onEmotionSelect(emotion.name)}
            style={{
              opacity: emotion.name === selectedEmotion ? 1 : 0.6,
              color: emotion.name === selectedEmotion ? 'black' : 'grey',
            }}
            aria-label={emotion.displayName}
          />
          <span
            css={css`
              font-size: 10px;
              opacity: emotion.name === selectedEmotion ? 1 : 0.5;
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
