import { css } from '@emotion/react';
import colors from '../../Colors/Colors';

const baseStyle = css`
  width: 45px;
  height: 45px;
  border-radius: 10px 20px 15px 30px;
  flex: none;
  order: 0;
  flex-grow: 0;
`;

const emotionStyles2 = {
  HAPPY: css`
    ${baseStyle};
    background: ${colors.lightYellow}; // 기쁨
  `,
  SAD: css`
    ${baseStyle};
    background: ${colors.lightBlue}; // 슬픔
  `,
  ROMANCE: css`
    ${baseStyle};
    background: ${colors.lightPink}; // 설렘
  `,
  ANXIETY: css`
    ${baseStyle};
    background: ${colors.lightPurple}; // 불안
  `,
  ANGRY: css`
    ${baseStyle};
    background: ${colors.lightRed}; // 화
  `,
};

export default emotionStyles2;

/* 사용법
import emotionStyles from './components/EmotionStyles/EmotionStyles';

const EmotionStyles = ({ emotion }) => {
  return <div css={emotionStyles[emotion]}></div>;
};

<EmotionStyles emotion="happy" />
<EmotionStyles emotion="sad" />
<EmotionStyles emotion="exciting" />
<EmotionStyles emotion="angry" />
<EmotionStyles emotion="anxiety" />
*/
