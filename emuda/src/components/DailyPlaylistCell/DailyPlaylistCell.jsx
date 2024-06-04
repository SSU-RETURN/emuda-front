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
  width: 61px;
  height: 61px;
  border-radius: 10px;
  background-color: ${color};
  margin-left: -1px;
  margin-right: 14px;
`;

const textStyle = css`
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 8px 2px;
  width: fit-content;
`;

const DailyPlaylistCell = ({ date, text, emotion, onClick }) => {
  let color;
  switch (emotion) {
    case 'HAPPY':
      color = colors.lightYellow;
      break;
    case 'SAD':
      color = colors.lightBlue;
      break;
    case 'ROMANCE':
      color = colors.lightPink;
      break;
    case 'ANGRY':
      color = colors.lightRed;
      break;
    case 'SURPRISE':
      color = colors.lightPurple;
      break;
  }
  return (
    <div css={listItemStyle(color)} onClick={onClick}>
      <div css={squareStyle(color)}></div>
      <div css={textStyle}>
        <span
          css={css`
            color: #4e4d4d;
            font-size: 13px;
            padding-bottom: 3px;
          `}
        >
          {date}
        </span>
        <span
          css={css`
            font-family: 'Pretendard-SemiBold';
            font-size: 16px;
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
