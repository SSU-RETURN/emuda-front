/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';
import defaultImage from '../../assets/background/PlayListCell_default_back.png';
import colors from '../../Colors/Colors';

function SquarePlayListCell({ image, title, artist }) {
  const [imgSrc, setImgSrc] = useState(image);

  const cellBoxStyle = css`
    width: 128px;
    height: 163px;
    border-radius: 7px;
    margin: 0px 9px;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: start;
    box-sizing: border-box;
  `;

  const musicCoverImageStyle = css`
    width: 128px;
    height: 128px;
    border-radius: 7px;
    object-fit: fill;
  `;

  const musicTitleTextStyle = css`
    font-family: 'Pretendard-Medium';
    margin-top: 4px;
    margin-bottom: 2px;
    font-size: 14px;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
  `;

  const artistNameTextStyle = css`
    font-family: 'Pretendard-Medium';
    text-align: left;
    font-size: 10px;
    color: ${colors.lightGray03};
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

  return (
    <div css={cellBoxStyle}>
      <img
        src={imgSrc}
        alt={title}
        css={musicCoverImageStyle}
        onError={() => setImgSrc(defaultImage)}
      />
      <span css={musicTitleTextStyle}>{getTitleWithEllipsis(title)}</span>
      <span css={artistNameTextStyle}>{getArtistNameWithEllipsis(artist)}</span>
    </div>
  );
}

export default SquarePlayListCell;
