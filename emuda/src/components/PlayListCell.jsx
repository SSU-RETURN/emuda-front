/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';

// The presence of 'description' does not matter
// Possible 'type' values: recommend, select, cancel
function PlayListCell({ image, title, artist, description, type }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const cellBoxStyle = css`
    width: 90%;
    aspect-ratio: 5 / 1;
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
    object-fit: cover;
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
    font-family: 'Alegreya Sans';
    font-weight: 500;
    font-size: 14px;
    color: #000000;
  `;

  const artistNameTextStyle = css`
    font-family: 'Alegreya Sans';
    font-weight: 400;
    font-size: 10px;
    color: ${type === 'recommend' ? '#000000' : '#6e6e6e'};
  `;
  const musicSummaryTextStyle = css`
    font-family: 'Alegreya Sans';
    font-weight: 400;
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
          <div css={[checkboxStyle, isChecked && checkedStyle]} onClick={handleCheckboxChange} />
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
