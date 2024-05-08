/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import colors from '../../Colors/Colors';
const listItemStyle = (color) => css`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 88%;
  height: 60px;
  margin-top: 10px;
  font-size: 14px;
  border: 2px solid ${color};
  border-radius: 15px;
`;

const squareStyle = (color) => css`
  width: 60px;
  height: 60px;
  border-radius: 15px;
  background-color: ${color};
  border: 1px solid ${color};
  margin-right: 8px;
`;

const textStyle = css`
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 8px 2px;
  width: fit-content;
`;

const DailyPlaylistCell = ({ date, text, emotion }) => {
  let color;
  switch (emotion) {
    case 'happy':
      color = colors.lightYellow;
      break;
    case 'sad':
      color = colors.lightBlue;
      break;
    case 'exciting':
      color = colors.lightPink;
      break;
    case 'angry':
      color = colors.lightPurple;
      break;
    case 'anxiety':
      color = colors.lightRed;
      break;
  }
  return (
    <div css={listItemStyle(color)}>
      <div css={squareStyle(color)}></div>
      <div css={textStyle}>
        <span
          css={css`
            font-size: 13px;
            padding-bottom: 3px;
          `}
        >
          {date}
        </span>
        <span
          css={css`
            font-size: 16px;
            font-weight: 800;
          `}
        >
          {text}
        </span>
      </div>
    </div>
  );
};

export default DailyPlaylistCell;

//<DailyPlaylistCell date="2024년 3월 20일" text="솔트 플레이리스트" emotion='exciting'/>
