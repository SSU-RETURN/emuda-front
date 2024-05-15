/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState, useEffect } from 'react';
import AppBarInEditMode from '../../components/AppBarInEditMode/AppBarInEditMode';
import AppBarInViewMode from '../../components/AppBarInViewMode/AppBarInViewMode';
import PlayListCell from '../../components/PlayListCell/PlayListCell';
import '../../Fonts/Font.css';
import colors from '../../Colors/Colors';
import Logo from '../../assets/emuda_logo.svg';

const Container = ({ children }) => {
  return <div css={containerStyle}>{children}</div>;
};

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
  margin-bottom: 80px;
`;

const DetailDiaryData = [
  {
    id: 1,
    date: '2024.03.20',
    week: '수요일',
    emotion: 'happy',
    image:
      'https://images.unsplash.com/photo-1487383298905-ee8a6b373ff9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    content:
      '오늘 너무 재미있었다. 오늘 너무 재미있었다. 오늘 너무 재미있었다. 오늘 너무 재미있었다.',
    playlistData1: [
      {
        id: 1,
        title: '곡명1',
        artist: '아티스트',
        image: Logo,
        description: '신날때 듣는 노래',
      },
      {
        id: 2,
        title: '곡명1',
        artist: '아티스트',
        image: Logo,
        description: '신날때 듣는 노래',
      },
      {
        id: 3,
        title: '곡명1',
        artist: '아티스트',
        image: Logo,
        description: '신날때 듣는 노래',
      },
    ],
    playlistData2: [
      {
        id: 1,
        title: '안녕',
        artist: '아티스트입니다.',
        image: Logo,
        description: '신날때 듣는 노래',
      },
      {
        id: 2,
        title: '이건',
        artist: '아티',
        image: Logo,
        description: '신날때 듣는 노래',
      },
      {
        id: 3,
        title: '더미 데이터',
        artist: '스트',
        image: Logo,
        description: '신날때 듣는 노래',
      },
    ],
  },
];

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

  const emotions = [
    { key: 'sad', label: '슬픈', color: colors.lightBlue },
    { key: 'happy', label: '기쁜', color: colors.lightYellow },
    { key: 'angry', label: '화났던', color: colors.lightRed },
    { key: 'exciting', label: '설레는', color: colors.lightPink },
    { key: 'anxiety', label: '불안한', color: colors.lightPurple },
  ];

  useEffect(() => {
    setDiaryData(DetailDiaryData[0]);
  });

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
      <AppBarInEditMode />
      <div css={subContainerStyle}>
        <div css={spanContainerStyle}>
          <span css={dateLabelStyle}>{diaryData?.date || ''}</span>
          <span css={weekLabelStyle}>{diaryData?.week || ''}</span>
        </div>
        <div css={spanContainerStyle}>
          <span css={emotionLabelStyle}>00님은 </span>
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
      </div>
    </Container>
  );
};

export default DetailDiaryView;
