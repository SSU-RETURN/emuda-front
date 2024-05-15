/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

// The presence of 'description' does not matter
// 'type' values: recommend, select, cancel
function PlayListCell({ image, title, artist, description, type, isChecked, onCheckChange }) {
  const cellBoxStyle = css`
    width: 95%;
    aspect-ratio: 5 / 1;
    min-height: 50px;
    margin: 5px 0 5px 2.5%;
    background-color: white;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    padding: 10px;
    align-content: center;
    box-sizing: border-box;
    box-shadow: ${type === 'select' || type === 'recommend'
      ? 'none'
      : '0px 0px 5px rgba(61, 150, 255, 0.5)'};
    overflow: hidden;
  `;
  const musicCoverImageStyle = css`
    flex-shrink: 0;
    aspect-ratio: 1 / 1;
    max-height: 100%;
    margin-right: 5px;
    border-radius: 7px;
    object-fit: fill;
  `;

  const outerTextBoxStyle = css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-content: center;
    align-items: center;
  `;
  const innerTextBoxStyle = css`
    height: 100%;
    display: flex;
    align-content: center;
    flex-direction: column;
    justify-content: center;
  `;

  const musicTitleTextStyle = css`
    font-family: 'Pretendard-Medium';
    font-size: 14px;
    color: #000000;
  `;

  const artistNameTextStyle = css`
    font-family: 'Pretendard-Medium';
    font-size: 10px;
    color: ${type === 'recommend' ? '#000000' : '#6e6e6e'};
  `;
  const musicSummaryTextStyle = css`
    font-family: 'Pretendard-Medium';
    font-size: 8px;
    color: ${type === 'recommend' ? '#000000' : '#cdcdcd'};
  `;

  const checkboxStyle = css`
    display: inline-block;
    height: 30%;
    aspect-ratio: 1 / 1;
    background-color: #dfdfdf;
    border: none;
    border-radius: 2px;
    cursor: pointer;
  `;

  const checkedStyle = css`
    background-color: #3d96ff;
    background-size: 100%;
    border: none;
    border-radius: 2px;
  `;

  const xMarkBtnStyle = css`
    background: none;
    padding: 0;
    height: 20%;
    aspect-ratio: 1 / 1;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  return (
    <div css={cellBoxStyle}>
      <img src={image} alt={title} css={musicCoverImageStyle} />
      <div css={outerTextBoxStyle}>
        <div css={innerTextBoxStyle}>
          <span css={musicTitleTextStyle}>{title}</span>
          <span css={artistNameTextStyle}>{artist}</span>
        </div>
        {description && <span css={musicSummaryTextStyle}>{description}</span>}
        {type === 'select' && (
          <div css={[checkboxStyle, isChecked && checkedStyle]} onClick={onCheckChange} />
        )}
        {type === 'cancel' && (
          <button css={xMarkBtnStyle}>
            <i className="fa-solid fa-x" style={{ color: '#6e6e6e' }}></i>
          </button>
        )}
      </div>
    </div>
  );
}

export default PlayListCell;
