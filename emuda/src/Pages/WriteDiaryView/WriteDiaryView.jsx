/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState, useRef, useEffect } from 'react';
import AppBarInEditMode from '../../components/AppBarInEditMode/AppBarInEditMode';
import { useNavigate, useLocation } from 'react-router-dom';
import emotionStyles from '../../components/EmotionStyles/EmotionStyles';
import Button from '../../components/Button/Button';
import PlayListCell from '../../components/PlayListCell/PlayListCell';
import '../../Fonts/Font.css';
import colors from '../../Colors/Colors';
import Magnifyingglass from '../../assets/magnifyingglass';
import photo_add from '../../assets/photo_add.svg';

const containerStyle = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  margin: 0px;
`;
const subContainerStyle = css`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  margin: 10px 22px;
`;

const subTitleStyle = css`
  width: 100%;
  font-family: 'Pretendard-SemiBold';
  font-size: 15px;
  text-align: left;
`;

const colorPickerStyle = css`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 16px;
  margin-bottom: 44px;

  button {
    border: none;
    outline: none;
    &:active,
    &:focus {
      border: none;
      outline: none;
    }
  }
`;

const selectedEmotionStyle = css`
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.4);
`;

const emotionLabelStyle = css`
  text-align: center;
  font-family: 'Pretendard-Medium';
  font-size: 10px;
  margin-top: 7px;
  color: black;
`;

const uploadIconStyle = css`
  width: 33.69px;
  height: 24.35px;
  background-image: url(${photo_add});
  background-size: cover;
`;

const imageContainerStyle = (imageSrc) => css`
  width: 100%;
  height: auto;
  aspect-ratio: ${2.5 / 1};
  background-color: ${colors.lightGray02};
  background-image: url(${imageSrc});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 14px;
`;

const textFieldStyle = css`
  width: 100%;
  min-height: 66px;
  padding: 10px;
  border: 1px solid ${colors.mainBlue};
  border-radius: 13px;
  margin: 13px 0px 44px 0px;
  resize: none;
  overflow: hidden;
  box-sizing: border-box;
  font-family: 'Pretendard-Medium';
  font-size: 12px;
  &::placeholder {
    color: ${colors.lighGray2};
    position: absolute;
    top: 27px;
    font-family: 'Pretendard-Medium';
    font-size: 10px;
  }
  &:focus {
    outline: none;
    border: 1px solid ${colors.mainBlue};
  }
`;

const searchButtonStyle = css`
  display: flex;
  background-color: white;
  font-family: 'Pretendard-Medium';
  font-size: 10px;
  color: ${colors.lighGray2};
  border: 1px solid ${colors.mainBlue};
  border-radius: 7px;
  width: 100%;
  height: 38.71px;
  text-align: left;
  align-items: center;
  margin: 14px 0px;
  padding: 10px;
  & div {
    margin-right: 13px;
    height: 100%;
    width: auto;
    aspect-ratio: ${20.29 / 18.71};
  }
`;

const activityListStyle = css`
  width: 100%;
  margin-bottom: 80px;
`;

const fixButtonBoxStyle = css`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 -1px 4px -1px ${colors.lightGray01};
`;

const WriteDiaryView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [diaryData, setDiaryData] = useState({
    id: null,
    emotion: '',
    image: '',
    content: '',
    playlistData: [],
  });
  const emotions = [
    { key: 'sad', label: '슬퍼요' },
    { key: 'happy', label: '기뻐요' },
    { key: 'angry', label: '화나요' },
    { key: 'exciting', label: '설레요' },
    { key: 'anxiety', label: '불안해요' },
  ];
  const fileInputRef = useRef(null);
  const textAreaRef = useRef(null);

  const Container = ({ children }) => {
    return <div css={containerStyle}>{children}</div>;
  };

  useEffect(() => {
    if (location.pathname === '/edit') {
      setDiaryData(diaryData[0]);
    } else if (location.pathname === '/write') {
      setDiaryData({
        id: null,
        emotion: '',
        image: '',
        content: '',
        playlistData: [],
      });
    }

    if (location.state && location.state.selectedMusic) {
      setDiaryData((prevData) => {
        // 이전에 저장된 플레이리스트 불러오기
        const currentPlaylist = JSON.parse(localStorage.getItem('musics')) || [];

        // 새로운 음악 데이터 가져오기
        const newMusic = location.state.selectedMusic;

        // 기존의 playlistData에 새로운 음악 데이터를 추가 (중복 체크)
        const updatedPlaylist = [...currentPlaylist, ...newMusic];

        // 중복된 항목 제거
        const uniquePlaylist = Array.from(new Set(updatedPlaylist.map((music) => music.id))).map(
          (id) => updatedPlaylist.find((music) => music.id === id)
        );

        // 업데이트된 플레이리스트를 로컬 스토리지에 저장
        localStorage.setItem('musics', JSON.stringify(uniquePlaylist));

        return {
          ...prevData,
          playlistData: uniquePlaylist,
        };
      });
    }

    const textArea = textAreaRef.current;
    if (textArea) {
      textArea.style.height = 'auto';
      textArea.style.height = `${textArea.scrollHeight}px`;
    }
  }, [location.pathname, location.state]);

  const handleTextChange = (event) => {
    const textarea = event.target;
    const content = event.target.value;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
    setDiaryData((prevData) => ({ ...prevData, content }));
  };

  const handleSearchClick = () => {
    navigate('/search');
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setDiaryData((prevData) => ({ ...prevData, image: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    localStorage.removeItem('musics');
    console.log(diaryData.playlistData);
    if (location.pathname === '/edit') {
      navigate('/detail');
    } else if (location.pathname === '/write') {
      navigate('/emotionGraph');
    }
  };
  return (
    <Container>
      <AppBarInEditMode />
      <div css={subContainerStyle}>
        <span css={subTitleStyle}>오늘의 감정</span>
        <div css={colorPickerStyle}>
          {emotions.map((emotion) => (
            <div key={emotion.key}>
              <button
                css={[
                  emotionStyles[emotion.key],
                  diaryData && diaryData.emotion === emotion.key && selectedEmotionStyle,
                ]}
                onClick={() => diaryData && setDiaryData({ ...diaryData, emotion: emotion.key })}
              />
              <div css={emotionLabelStyle}>{emotion.label}</div>
            </div>
          ))}
        </div>
        <span css={subTitleStyle}>오늘의 일기</span>
        <div css={imageContainerStyle(diaryData.image)}>
          <div css={uploadIconStyle} onClick={() => fileInputRef.current.click()} />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            style={{ display: 'none' }}
            accept="image/*"
          />
        </div>
        <textarea
          css={textFieldStyle}
          type="text"
          value={diaryData?.content || ''}
          onChange={handleTextChange}
          placeholder="오늘 하루 무슨 일이 있었나요?"
          ref={textAreaRef}
        />
        <span css={subTitleStyle}>오늘의 노래 플레이리스트</span>
        <button css={searchButtonStyle} onClick={handleSearchClick}>
          <div>
            <Magnifyingglass fillColor="#3D96FF" strokeColor="#3D96FF" />
          </div>
          원하는 노래를 검색해보세요.
        </button>
        <div css={activityListStyle}>
          {diaryData?.playlistData?.map((item) => (
            <PlayListCell
              key={item.id}
              image={item.pictureKey}
              title={item.title}
              artist={item.artist}
              type={'cancel'}
            />
          ))}
        </div>
      </div>
      <div css={fixButtonBoxStyle}>
        <Button text="작성하기" onClick={handleNext} />
      </div>
    </Container>
  );
};

export default WriteDiaryView;
