/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../../components/Button/Button';
import PlayListCell from '../../components/PlayListCell/PlayListCell';
import '../../Fonts/Font.css';
import colors from '../../Colors/Colors';
import MusicCardFront from '../../assets/music_card_front.svg';
import MusicCardBack from '../../assets/music_card_back.svg';
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
  padding: 0px;
  padding-bottom: 30px;
  margin: 0px;
`;

const subContainerStyle = css`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  margin: 50px 22px;
`;

const subTitleStyle = css`
  width: 100%;
  font-family: 'Pretendard-Medium';
  font-size: 14px;
  text-align: left;
  margin-left: 22px;
  color: ${colors.lightGray03};
`;

const mainTitleStyle = css`
  width: 100%;
  font-family: 'Pretendard-Bold';
  font-size: 17px;
  text-align: left;
  margin-left: 22px;
  margin-top: 3px;
  color: black;
`;

const cardWrapperStyle = css`
  width: calc(100% - 44px);
  height: auto;
  aspect-ratio: 349 / 624;
  position: relative;
  perspective: 800px;
  margin-top: 13px;
`;

const cardStyle = css`
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  position: relative;

  &:hover {
    transform: rotateY(180deg);
  }
`;

const cardContentStyle = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
`;

const cardFrontStyle = css`
  ${cardContentStyle}
  background-image: url(${MusicCardFront});
  background-repeat: no-repeat;
  background-position: top center;
  background-size: contain;
`;

const cardBackStyle = css`
  ${cardContentStyle}
  background-image: url(${MusicCardBack});
  background-repeat: no-repeat;
  background-position: top center;
  background-size: contain;
  transform: rotateY(180deg);
`;

const recommendLabelStyle = css`
  font-family: 'Pretendard-Regular';
  font-size: 16px;
  text-align: left;
  margin: 30px 25px 5px 25px;
`;

const activityListStyle = css`
  width: calc(100% - 50px);
  margin: 15px 25px;
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

const MusicCardView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [AiPlaylist, setAiPlaylist] = useState([]);
  const [EmotionPlaylist, setEmotionPlaylist] = useState([]);
  const nickname = localStorage.getItem('nickname');
  const emotion = location.state.emotion;
  const date = location.state.date;

  const getPlaylist = async (date) => {
    try {
      const memberId = localStorage.getItem('memberId');
      const response = await axios.get(`${apiUrl}/api/recommend/${memberId}/${date}`);
      return response.data;
    } catch (error) {
      alert('Error while Getting Playlist');
      return null;
    }
  };

  useEffect(() => {
    const fetchPlaylist = async (date) => {
      try {
        const playlists = await getPlaylist(date);
        const aipl = playlists.result.aiPlaylist;
        const empl = playlists.result.memberEmotionPlaylist;
        setAiPlaylist(aipl.slice(0, 3));
        setEmotionPlaylist(empl.slice(0, 3));
      } catch (error) {
        alert('Error Fetching PlayList');
      }
    };
    fetchPlaylist(date);
  }, [date]);

  const questionText = (emotion) => {
    let text = '';
    switch (emotion) {
      case 'SAD':
        text = '슬픈 오늘 이 노래는 어떤가요?';
        break;
      case 'ROMANCE':
        text = '설렌 오늘 이 노래는 어떤가요?';
        break;
      case 'HAPPY':
        text = '기쁜 오늘 이 노래는 어떤가요?';
        break;
      case 'ANGRY':
        text = '화난 오늘 이 노래는 어떤가요?';
        break;
      case 'ANXIETY':
        text = '불안한 오늘 이 노래는 어떤가요?';
        break;
      default:
        text = '오늘 이 노래는 어떤가요?';
        break;
    }
    return text;
  };

  const suggestionText = (nickname, emotion) => {
    let text = '';
    switch (emotion) {
      case 'SAD':
        text = `${nickname}님은 슬플 때 이런 노래들을 들었어요`;
        break;
      case 'ROMANCE':
        text = `${nickname}님은 설렐 때 이런 노래들을 들었어요`;
        break;
      case 'HAPPY':
        text = `${nickname}님은 기쁠 때 이런 노래들을 들었어요`;
        break;
      case 'ANGRY':
        text = `${nickname}님은 화날 때 이런 노래들을 들었어요`;
        break;
      case 'ANXIETY':
        text = `${nickname}님은 불안할 때 이런 노래들을 들었어요`;
        break;
      default:
        text = `${nickname}님은 이런 노래들을 들었어요`;
        break;
    }
    return text;
  };

  const handleNext = () => {
    navigate('/detail', { state: { diaryId: location.state.diaryID } });
  };

  return (
    <Container>
      <div css={subContainerStyle}>
        <span css={subTitleStyle}>일기 작성이 완료 되었어요.</span>
        <span css={mainTitleStyle}>{nickname}님을 위한 추천 노래를 확인하세요!</span>
        <div css={cardWrapperStyle}>
          <div css={cardStyle}>
            <div css={cardFrontStyle}></div>
            <div css={cardBackStyle}>
              <div css={recommendLabelStyle}>{questionText(emotion)}</div>
              <div css={activityListStyle}>
                {AiPlaylist.map((item) => (
                  <PlayListCell
                    key={item.id}
                    image={item.pictureKey}
                    title={item.title}
                    artist={item.artist}
                    description={item.description}
                  />
                ))}
              </div>
              <div css={recommendLabelStyle}>{suggestionText(nickname, emotion)}</div>
              <div css={activityListStyle}>
                {EmotionPlaylist.map((item) => (
                  <PlayListCell
                    key={item.id}
                    image={item.pictureKey}
                    title={item.title}
                    artist={item.artist}
                    description={item.description}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div css={fixButtonBoxStyle}>
        <Button text="완료" onClick={handleNext} />
      </div>
    </Container>
  );
};

export default MusicCardView;
