/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState, useRef, useEffect } from 'react';
import AppBarInEditMode from '../../components/AppBarInEditMode/AppBarInEditMode';
import { useNavigate, useLocation } from 'react-router-dom';
import emotionStyles from '../../components/EmotionStyles/EmotionStyles2';
import Button from '../../components/Button/Button';
import PlayListCell from '../../components/PlayListCell/PlayListCell';
import '../../Fonts/Font.css';
import colors from '../../Colors/Colors';
import Magnifyingglass from '../../assets/magnifyingglass';
import photo_add from '../../assets/photo_add.svg';
import axios from 'axios';
import { apiUrl } from '../../config/config';
const containerStyle = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0px;
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
  const memberId = localStorage.getItem('memberId');


  const [diaryData, setDiaryData] = useState({
    memberId: memberId,
    content: '',
    memberEmotion: '',
    musicList: [],
    image: '',
  });
  const emotions = [
    { key: 'SAD', label: '슬퍼요' },
    { key: 'HAPPY', label: '기뻐요' },
    { key: 'ANGRY', label: '화나요' },
    { key: 'ROMANCE', label: '설레요' },
    { key: 'SURPRISE', label: '불안해요' },
  ];
  
  const fileInputRef = useRef(null);
  const textAreaRef = useRef(null);
  const textAreaHeightRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);


  const Container = ({ children }) => {
    return <div css={containerStyle}>{children}</div>;
  };

  useEffect(() => {
    const savedDiaryData = localStorage.getItem('diaryData');
    if (savedDiaryData) {
      setDiaryData(JSON.parse(savedDiaryData));
      console.log('Restored diaryData from localStorage:', savedDiaryData);
    } else {
      if (location.pathname === '/edit') {
        setDiaryData(diaryData[0]);
      } else if (location.pathname === '/write') {
        setDiaryData({
          memberId: memberId,
          content: '',
          memberEmotion: '',
          writtenDate: '',
          musicList: [],
        });
      }
    }

    if (location.state && location.state.selectedMusic) {
          //   const selectedMusic = Array.isArray(location.state.selectedMusic)
    //     ? location.state.selectedMusic.filter(music => music !== null && typeof music === 'object' && music.id)
    //     : [];
      setDiaryData((prevData) => ({
        ...prevData,
        musicList: location.state.selectedMusic,
      }));
    }
    if (location.state && location.state.diaryData) {
      setDiaryData((prevData) => ({
        ...prevData,
        ...location.state.diaryData,
      }));
    }
    const textArea = textAreaRef.current;
    if (textArea) {
      textArea.style.height = 'auto';
      textArea.style.height = `${textArea.scrollHeight}px`;
    }
  }, [location.pathname, location.state]);
  
  useEffect(() => {
    const textArea = textAreaRef.current;
    if (textArea && textAreaHeightRef.current) {
      textArea.style.height = `${textAreaHeightRef.current}px`;
    }
  }, [diaryData.content]);

  const handleTextChange = (event) => {
    const textArea = event.target;
    if (textArea.scrollHeight > textArea.clientHeight) {
      textArea.style.height = 'auto';
      textArea.style.height = `${textArea.scrollHeight}px`;
    }

    // const content = event.target.value;
    // setDiaryData((prevData) => ({ ...prevData, content }));
  };

  const handleBlur = (event) => {
    const content = event.target.value;
    setDiaryData((prevData) => ({ ...prevData, content }));

    const textArea = event.target;
    if (textArea) {
      textAreaHeightRef.current = textArea.scrollHeight;
    }
  };

  const handleSearchClick = () => {
  localStorage.setItem('diaryData', JSON.stringify(diaryData));
  console.log('Saved diaryData to localStorage before navigating to search:', diaryData); 
  navigate('/search', { state: { diaryData } });
};


  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImageFile(file); 
      const reader = new FileReader();
      reader.onload = (e) => {
        setDiaryData((prevData) => ({ ...prevData, image: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = async () => {
    const selectedDate = location.state?.selectedDate || new Date().toISOString().split('T')[0];

    const diaryDataToSend = {
        memberId: parseInt(memberId), 
        content: diaryData.content,
        memberEmotion: diaryData.memberEmotion.toUpperCase(),
        writtenDate: selectedDate, 
        musicList: diaryData.musicList.map(music => music.id) // musicList에서 각 항목의 id 값을 사용
    };

    console.log('Sending Diary Data:', diaryDataToSend); 

    const formData = new FormData();
    formData.append('diary', JSON.stringify(diaryDataToSend)); 

    if (imageFile) {
        formData.append('image', imageFile, imageFile.name); 
    }

    for (let key of formData.keys()) {
        console.log(key, formData.get(key));
    }

    try {
        const response = await axios.post(`${apiUrl}/api/diary/create`, formData);
        console.log('POST successful, response:', response); 

        if (response.status === 201) {
          const diaryID = response.data.result.id; // 서버로부터 반환된 id 값 저장
            localStorage.removeItem('diary');
            localStorage.removeItem('diaryData');
            navigate('/emotionGraph', { state: { diaryID } }); // diaryID를 다음 페이지로 전달
          } else {
            alert('일기 작성 중 오류가 발생했습니다.');
        }
    } catch (error) {
        console.error('Error posting diary:', error);
        alert('일기 작성 중 문제가 발생했습니다.');
    }
};


  return (
    <Container>
      <AppBarInEditMode text="일기작성" />
      <div css={subContainerStyle}>
        <span css={subTitleStyle}>오늘의 감정</span>
        <div css={colorPickerStyle}>
          {emotions.map((memberEmotion) => (
            <div key={memberEmotion.key}>
              <button
                css={[
                  emotionStyles[memberEmotion.key],
                  diaryData && diaryData.memberEmotion === memberEmotion.key && selectedEmotionStyle,
                ]}
                onClick={() => diaryData && setDiaryData({ ...diaryData, memberEmotion: memberEmotion.key })}
              />
              <div css={emotionLabelStyle}>{memberEmotion.label}</div>
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
          defaultValue={diaryData?.content || ''}
          onChange={handleTextChange}
          onBlur={handleBlur}
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
          {diaryData?.musicList?.map((item) => (
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
