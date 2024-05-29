/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState, useEffect } from 'react';
import AppBarInViewMode from '../../components/AppBarInViewMode/AppBarInViewMode';
import PlayListCell from '../../components/PlayListCell/PlayListCell';
import '../../Fonts/Font.css';
import colors from '../../Colors/Colors';
import EmotionChart from '../../components/EmotionChart/EmotionChart';
import axios from 'axios';
import { apiUrl } from '../../config/config';

const Container = ({ children }) => {
  return <div css={containerStyle}>{children}</div>;
};

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

const spanContainerStyle = css`
  display: flex;
  width: calc(100% - 44px);
  flex-direction: row;
  justify-content: left;
  align-items: center;
`;

const dateLabelStyle = css`
  font-family: 'Pretendard-Bold';
  font-size: 20px;
  margin-right: 10px;
`;

const weekLabelStyle = css`
  font-family: 'Pretendard-Bold';
  font-size: 25px;
  color: ${colors.mainBlue};
`;

const emotionLabelStyle = css`
  font-family: 'Pretendard-Bold';
  font-size: 15px;
`;

const subTitleStyle = css`
  width: calc(100% - 44px);
  font-family: 'Pretendard-SemiBold';
  font-size: 15px;
  text-align: left;
  margin: 20px 0px;
`;

const imageContainerStyle = css`
  width: calc(100% - 44px);
  height: auto;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin-top: 14px;
`;

const textFieldStyle = css`
  width: calc(100% - 44px);
  min-height: 66px;
  padding: 10px;
  background-color: ${colors.lightGray02};
  border: 0px;
  border-radius: 7px;
  margin-top: 13px;
  resize: none;
  overflow: hidden;
  box-sizing: border-box;
  font-family: 'Pretendard-Medium';
  font-size: 12px;
`;

const tabContainerStyle = css`
  width: calc(100% - 44px);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const tabButtonContainerStyle = css`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const tabButtonStyle = css`
  width: calc(50% - 5px);
  padding: 10px 20px;
  font-family: 'Pretendard-Medium';
  font-size: 13px;
  background-color: white;
  border: 1px solid ${colors.lightGray01};
  color: black;
  border-radius: 10px;
  cursor: pointer;
  outline: none;
  &:hover {
    color: white;
    background-color: ${colors.mainBlue};
    border: 0px;
  }
  &.active {
    background-color: ${colors.mainBlue};
    color: white;
    border: 0px;
  }
`;

const tabContentStyle = css`
  margin-top: 10px;
  padding: 0px;
  border: 0px;
  width: 100%;
`;

const activityListStyle = css`
  width: 100%;
  margin-bottom: 20px;
`;

const graphContainerStyle = css`
  width: calc(100% - 44px);
  height: 200px;
  aspect-ratio: ${352 / 581};
  display: flex;
  margin-bottom: 80px;
`;


const DetailDiaryView = () => {
  const [diaryData, setDiaryData] = useState({
    id: null,
    date: '',
    week: '',
    emotion: '',
    image: '',
    content: '',
    playlistData1: [],
    playlistData2: [],
  });
  const [activeTab, setActiveTab] = useState('today');
  const storedNickname = localStorage.getItem('nickname');

  const emotions = [
    { key: 'SAD', label: '슬픈', color: colors.lightBlue},
    { key: 'HAPPY', label: '기쁜', color: colors.lightYellow },
    { key: 'ANGRY', label: '화나는', color: colors.lightRed },
    { key: 'ROMANCE', label: '설레는', color: colors.lightPink },
    { key: 'SURPRISE', label: '불안한', color: colors.lightPurple },
  ];

  useEffect(() => {
    const diaryID = 8;// 앞에 연결 후 연결 할 예정
    fetchDiaryDetails(diaryID);
  }, []);

  const fetchDiaryDetails = async (diaryID) => {
    try {
      const response = await axios.get(`${apiUrl}/api/diary/details/${diaryID}`);
      if (response.data.isSuccess) {
        const result = response.data.result;
        const weekDay = new Date(result.writtenDate).toLocaleDateString('ko-KR', { weekday: 'long' });
        setDiaryData({
          ...result,
          date: result.writtenDate,
          week: weekDay,
          emotion: result.memberEmotion,
          image: result.pictureKey,
          playlistData1: [2,3], // 실제 데이터로 교체할 예쩡
          playlistData2: [1, 5], 
        });
      } else {
        console.error('Failed to fetch diary details:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching diary details:', error);
    }
  };

  const renderImageContainer = () => {
    if (diaryData.image) {
      return (
        <div css={imageContainerStyle}>
          <img src={diaryData.image} alt="Diary Entry" style={{ width: '100%', height: 'auto' }} />
        </div>
      );
    }
    return null;
  };

  const selectedEmotion = emotions.find((e) => e.key === diaryData.emotion);
  const selectedEmotionColor = selectedEmotion ? selectedEmotion.color : 'red';

  const renderContent = () => {
    switch (activeTab) {
      case 'today':
        return (
          <div css={tabContentStyle}>
            {' '}
            <div css={activityListStyle}>
              {diaryData?.playlistData1?.map((item) => (
                <PlayListCell
                  key={item.id}
                  image={item.image}
                  title={item.title}
                  artist={item.artist}
                  type={'recomand'}
                  description={item.description}
                />
              ))}
            </div>
          </div>
        );
      case 'recommend':
        return (
          <div css={tabContentStyle}>
            {' '}
            <div css={activityListStyle}>
              {diaryData?.playlistData2?.map((item) => (
                <PlayListCell
                  key={item.id}
                  image={item.image}
                  title={item.title}
                  artist={item.artist}
                  type={item.type}
                  description={item.description}
                />
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Container>
      <AppBarInViewMode />
      <div css={subContainerStyle}>
        <div css={spanContainerStyle}>
          <span css={dateLabelStyle}>{diaryData?.date || ''}</span>
          <span css={weekLabelStyle}>{diaryData?.week || ''}</span>
        </div>
        <div css={spanContainerStyle}>
          <span css={emotionLabelStyle}>{storedNickname}님은 </span>
          <span css={emotionLabelStyle} style={{ color: selectedEmotionColor }}>
            {selectedEmotion?.label}
          </span>
          <span css={emotionLabelStyle}>하루를 보냈어요!</span>
        </div>
        {renderImageContainer()}
        <div css={textFieldStyle}>{diaryData?.content || ''}</div>
        <span css={subTitleStyle}>노래와 함께 추억을 되돌아 보세요.</span>
        <div css={tabContainerStyle}>
          <div css={tabButtonContainerStyle}>
            <button
              css={tabButtonStyle}
              className={activeTab === 'today' ? 'active' : ''}
              onClick={() => setActiveTab('today')}
            >
              오늘의 플레이리스트
            </button>
            <button
              css={tabButtonStyle}
              className={activeTab === 'recommend' ? 'active' : ''}
              onClick={() => setActiveTab('recommend')}
            >
              추천 플레이리스트
            </button>
          </div>
          {renderContent()}
        </div>
        <div css={graphContainerStyle}>
          <EmotionChart data={[20, 17, 22, 40, 0]} height="100%" /> {/* 예시 차트 데이터 넣어둠 -> 앞에 연결 후 할 예정*/}
        </div>
      </div>
    </Container>
  );
};

export default DetailDiaryView;
