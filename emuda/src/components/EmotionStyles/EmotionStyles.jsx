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

const emotionStyles = {
  happy: css`
    ${baseStyle};
    background: ${colors.lightYellow}; // 기쁨
  `,
  sad: css`
    ${baseStyle};
    background: ${colors.lightBlue}; // 슬픔
  `,
  exciting: css`
    ${baseStyle};
    background: ${colors.lightPink}; // 설렘
  `,
  anxiety: css`
    ${baseStyle};
    background: ${colors.lightPurple}; // 불안
  `,
  angry: css`
    ${baseStyle};
    background: ${colors.lightRed}; // 화
  `,
  today: css`
    ${baseStyle};
    background: white; // 오늘
    border: 2px solid ${colors.mainBlue};
    // background: ${colors.mainBlue}; // 오늘
    `,

  select: css`
    ${baseStyle};
    background: ${colors.mainBlue}; // 클릭 날짜
`
};

export default emotionStyles;

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
