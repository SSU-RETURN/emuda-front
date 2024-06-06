/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
  font-size: 20px;
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

const spinnerStyle = css`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #3d96ff;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const spinnerOverlayStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.7);
  z-index: 9999;
  flex-direction: column;
`;

const spinnerTextStyle = css`
  margin-top: 10px;
  font-family: 'Pretendard-Medium';
  font-size: 14px;
  color: ${colors.mainBlue};
  margin-top: 25px;
`;


const DetailDiaryView = () => {
  const location = useLocation();
  const diaryId = location.state?.diaryId;
  const memberId = localStorage.getItem('memberId');
  const [activeTab, setActiveTab] = useState('today');
  const storedNickname = localStorage.getItem('nickname');
  const [emotionGraphData, setEmotionGraphData] = useState([]); // 수정된 부분
  const [loading, setLoading] = useState(true); // 수정된 부분

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

  const emotions = [
    { key: 'SAD', label: '슬픈', color: colors.lightBlue },
    { key: 'HAPPY', label: '기쁜', color: colors.lightYellow },
    { key: 'ANGRY', label: '화나는', color: colors.lightRed },
    { key: 'ROMANCE', label: '설레는', color: colors.lightPink },
    { key: 'ANXIETY', label: '불안한', color: colors.lightPurple },
  ];

  useEffect(() => {
    if (diaryId) {
      fetchDiaryDetails(diaryId);
      fetchEmotionGraph(diaryId); // 수정된 부분
    }
  }, [diaryId]);

  const fetchDiaryDetails = async (diaryId) => {
    try {
      const response = await axios.get(`${apiUrl}/api/diary/details/${diaryId}`);
      if (response.data.isSuccess) {
        const result = response.data.result;
        const weekDay = new Date(result.writtenDate).toLocaleDateString('ko-KR', {
          weekday: 'long',
        });
        setDiaryData({
          ...result,
          date: result.writtenDate,
          week: weekDay,
          emotion: result.memberEmotion,
          image: result.pictureKey,
          playlistData1: [],
          playlistData2: result.playlistData2 || [],
        });
        fetchPlaylist(result.writtenDate);
        fetchRecommendedPlaylist(memberId, result.writtenDate); // 추천 플레이리스트 가져오기
      } else {
        console.error('Failed to fetch diary details:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching diary details:', error);
    } finally {
      setLoading(false); // 수정된 부분
    }
  };

  const fetchPlaylist = async (writtenDate) => {
    try {
      const formattedDate = writtenDate.split('T')[0];
      const response = await axios.get(`${apiUrl}/api/playlist/date/${formattedDate}`, {
        params: {
          memberId: memberId,
        },
      });
      if (response.data.isSuccess) {
        setDiaryData((prevData) => ({
          ...prevData,
          playlistData1: response.data.result || [],
        }));
      } else {
        console.error('Failed to fetch playlist:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching playlist:', error);
    }
  };
  const fetchRecommendedPlaylist = async (memberId, writtenDate) => {
    try {
      const formattedDate = new Date(writtenDate)
        .toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
        .replace(/\./g, '-')
        .replace(/ /g, '')
        .replace(/-/g, '-')
        .slice(0, 10);
      const response = await axios.get(`${apiUrl}/api/recommend/${memberId}/${formattedDate}`);
      if (response.data.isSuccess) {
        setDiaryData((prevData) => ({
          ...prevData,
          playlistData2: response.data.result.aiPlaylist.slice(0, 5) || [],
        }));
      } else {
        console.error('Failed to fetch recommended playlist:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching recommended playlist:', error);
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

  const fetchEmotionGraph = async (diaryId) => {
    try {
      const response = await axios.get(`${apiUrl}/api/diary/emotion/${diaryId}`);
      if (response.data.isSuccess) {
        const result = response.data.result;
        setEmotionGraphData([result.sad, result.happy, result.angry, result.surprise]);
      } else {
        console.error('Failed to fetch emotion graph:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching emotion graph:', error);
    }
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
                  image={item.pictureKey}
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
                  image={item.pictureKey}
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
      {loading && ( // 수정된 부분: 로딩 중일 때 스피너 표시
        <div css={spinnerOverlayStyle}>
          <div css={spinnerStyle} />
          <div css={spinnerTextStyle}>일기 데이터를 불러오는 중입니다.</div>
        </div>
      )}
      {!loading && (
        <>

      <AppBarInViewMode diaryId={diaryId} />
      <div css={subContainerStyle}>
        <div css={spanContainerStyle}>
          <span css={dateLabelStyle}>{diaryData?.date || ''}</span>
          <span css={weekLabelStyle}>{diaryData?.week || ''}</span>
        </div>
        <div css={spanContainerStyle}>
          <span css={emotionLabelStyle}>{storedNickname}님은&nbsp;</span>
          <span
            css={emotionLabelStyle}
            style={{
              backgroundColor: selectedEmotionColor,
              color: 'black',
              padding: '0 0px',
              borderRadius: '3px',
            }}
          >
            {selectedEmotion?.label} 하루
          </span>
          <span css={emotionLabelStyle}>를 보냈어요!</span>
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
          <EmotionChart data={emotionGraphData} height="100%" /> {/* 수정된 부분 */}
        </div>
      </div>
      </>
      )}
    </Container>
  );
};

export default DetailDiaryView;
