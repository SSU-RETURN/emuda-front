import emotionStyles from '/Users/yunha/Desktop/코딩/Algorithms/emuda-front/emuda/src/components/EmotionStyles/EmotionStyles.jsx';
import { css } from '@emotion/react';
const containerStyle = css`
  display: flex;
  height: 60px;
  flex-direction: column;
  justify-content: space-between;
`;
const EmotionStyles = ({ emotion }) => {
  return <div css={emotionStyles[emotion]}></div>;
};

const EmotionCell = ({ emotion }) => {
  let emotionText;
  switch (emotion) {
    case 'happy':
      emotionText = '기뻐요';
      break;
    case 'sad':
      emotionText = '슬퍼요';
      break;
    case 'angry':
      emotionText = '화나요';
      break;
    case 'flutter':
      emotionText = '설레요';
      break;
    case 'anxious':
      emotionText = '불안해요';
      break;
    default:
      emotionText = '입력불가감정';
  }
  return (
    <div css={containerStyle}>
      <EmotionStyles emotion={emotion}></EmotionStyles>
      <span>{emotionText}</span>
    </div>
  );
};

export default EmotionCell;

//<EmotionCell emotion="happy"/>
//로 사용하면 됨.
