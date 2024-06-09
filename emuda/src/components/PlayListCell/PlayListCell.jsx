/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';
import defaultImage from '../../assets/background/PlayListCell_default_back.png';
import Heart from '../../assets/heart/heart.svg';
import HeartFill from '../../assets/heart/heart_fill.svg';

// The presence of 'description' does not matter
// 'type' values: recommend, select, cancel
function PlayListCell({
  image,
  title,
  artist,
  type,
  isChecked,
  onCheckChange,
  onClickCancel = undefined,
}) {
  const [imgSrc, setImgSrc] = useState(image);
  const [isLiked, setIsLiked] = useState(false);

  const cellBoxStyle = css`
    width: 100%;
    aspect-ratio: 5 / 1;
    min-height: 50px;
    margin: 7px 0 7px 0;
    background-color: white;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    padding: 10px;
    align-content: center;
    box-sizing: border-box;
    box-shadow: ${type === 'select' || type === 'recommend' || type === 'like'
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
    align-content: start;
    align-items: start;
    flex-direction: column;
    justify-content: center;
  `;

  const musicTitleTextStyle = css`
    font-family: 'Pretendard-Medium';
    font-size: 14px;
    text-align: left;
    color: #000000;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
  `;

  const artistNameTextStyle = css`
    font-family: 'Pretendard-Medium';
    font-size: 10px;
    color: ${type === 'recommend' ? '#000000' : '#6e6e6e'};
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

  const btnStyle = css`
    background: none;
    padding: 0;
    height: 20%;
    aspect-ratio: 1 / 1;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  const getTitleWithEllipsis = (title) => {
    const maxLength = 24;
    const ellipsis = '...';

    if (title.length > maxLength) {
      return `${title.slice(0, maxLength - ellipsis.length)}${ellipsis}`;
    }
    return title;
  };
  const getArtistNameWithEllipsis = (artist) => {
    const maxLength = 24;
    const ellipsis = '...';

    if (artist.length > maxLength) {
      return `${artist.slice(0, maxLength - ellipsis.length)}${ellipsis}`;
    }
    return artist;
  };

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div css={cellBoxStyle}>
      <img
        src={imgSrc}
        alt={title}
        css={musicCoverImageStyle}
        onError={() => setImgSrc(defaultImage)}
      />
      <div css={outerTextBoxStyle}>
        <div css={innerTextBoxStyle}>
          <span css={musicTitleTextStyle}>{getTitleWithEllipsis(title)}</span>
          <span css={artistNameTextStyle}>{getArtistNameWithEllipsis(artist)}</span>
        </div>
        {type === 'like' && (
          <button css={btnStyle} onClick={handleLikeClick}>
            {isLiked ? <img src={HeartFill} /> : <img src={Heart} />}
          </button>
        )}
        {type === 'select' && (
          <div css={[checkboxStyle, isChecked && checkedStyle]} onClick={onCheckChange} />
        )}
        {type === 'cancel' && (
          <button css={btnStyle} onClick={onClickCancel}>
            <i className="fa-solid fa-x" style={{ color: '#6e6e6e' }}></i>
          </button>
        )}
      </div>
    </div>
  );
}

export default PlayListCell;
