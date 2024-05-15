/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';
import AppBarInEditMode from '../../components/AppBarInEditMode/AppBarInEditMode';
import colors from '../../Colors/Colors';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';


// Styles
const pageStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 0;
  max-width: 800px;
  width: 100%;
  height: 100vh;
  font-family: 'Pretendard-Medium';
`;

const progressBarContainerStyle = css`
  display: flex;
  align-items: center;
  width: 330;
  margin: 20px 0;
`;

const progressBarLabelStyle = () => css`
  font-size: 14px;
  color: ${colors.mainBlue};
  margin-right: 10px;
  font-weight: bold;
`;

const progressBarStyle = progress => css`
  width: 320px;
  height: 20px;
  background-color: #ddd;
  border-radius: 10px;
  overflow: hidden;
  position: relative;

  &::after {
    content: '';
    display: block;
    height: 100%;
    width: ${progress}%;
    background-color: ${colors.mainBlue};
    border-radius: 10px;
  }
`;

const headerTextStyle = css`
  font-size: 20px;
  color: ${colors.black};
  text-align: center;
  margin-top: 15px;
  margin-bottom: 30px;
  font-family: 'Pretendard-SemiBold';
`;

const musicPreferStyle = (isSelected, index) => css`
  width: 120px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  background-color: ${isSelected ? 'rgba(0, 123, 255, 0.2)' : 'white'};
  border-radius: 15px;
  border: ${isSelected ? '3px' : '1px'} solid ${isSelected ? colors.mainBlue : 'rgba(0, 123, 255, 0.5)'};
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  cursor: pointer;
  position: relative;
  color: ${colors.black};

  &::before {
    content: ${isSelected ? `'${index}'` : ''};
    position: absolute;
    top: -10px;
    right: -10px;
    background-color: ${colors.mainBlue};
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: ${isSelected ? 'flex' : 'none'};
    align-items: center;
    justify-content: center;
    color: white;
  }
`;

const musicContainerStyle = css`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
`;

const bigContainerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 330px;
  height: 300px;
  margin-bottom: 150px;

`;

const bottomBarStyle = css`
  margin-top: auto;
  width: 100%;
  padding: 10px;
  background-color: white;
  display: flex;
  justify-content: space-around;
`;

// Component
const PreferFirst = () => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const navigate = useNavigate();


  const handleSelectGenre = genre => {
    const index = selectedGenres.indexOf(genre);
    if (index > -1) {
      setSelectedGenres(prev => prev.filter((_, i) => i !== index));
    } else if (selectedGenres.length < 3) {
      setSelectedGenres(prev => [...prev, genre]);
    }
  };

  const getGenreIndex = genre => selectedGenres.indexOf(genre) + 1;

  const genres = ['💃 댄스', '🎤 발라드', '🪩 트로트', '🎧 힙합', '🎹 밴드', '🎷 재즈', '🎻 클래식', '🎶 팝', '🎸 록', '🤠 컨트리'];

  const handleNextClick = () => {
    navigate('/prefersecond');
  };

  return (
    <div css={pageStyle}>
      <AppBarInEditMode title="노래 취향" />
      <div css={progressBarContainerStyle}>
        <div css={progressBarLabelStyle(selectedGenres.length * 10)}>{`${selectedGenres.length * 10}%`}</div>
        <div css={progressBarStyle(selectedGenres.length * 10)}></div>
      </div>
      <div css={headerTextStyle}>선호 장르 3가지를 정해주세요.</div>
      <div css={bigContainerStyle}>
        {genres.map((genre, index) => (
          index % 2 === 0 && (
            <div css={musicContainerStyle} key={genre}>
              <div css={musicPreferStyle(selectedGenres.includes(genre), getGenreIndex(genre))} onClick={() => handleSelectGenre(genre)}>
                {genre}
              </div>
              {genres[index + 1] && (
                <div css={musicPreferStyle(selectedGenres.includes(genres[index + 1]), getGenreIndex(genres[index + 1]))} onClick={() => handleSelectGenre(genres[index + 1])}>
                  {genres[index + 1]}
                </div>
              )}
            </div>
          )
        ))}
      </div>
      <div css={bottomBarStyle}>
        <Button text="다음" onClick={handleNextClick} />
      </div>
    </div>
  );
};

export default PreferFirst;
