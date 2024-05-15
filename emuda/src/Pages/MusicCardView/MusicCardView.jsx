/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import PlayListCell from '../../components/PlayListCell/PlayListCell';
import '../../Fonts/Font.css';
import colors from '../../Colors/Colors';
import MusicCardFront from '../../assets/music_card_front.svg';
import MusicCardBack from '../../assets/music_card_back.svg';
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

const cardStyle = css`
  margin-top: 13px;
  width: calc(100% - 44px);
  height: auto;
  aspect-ratio: 349 / 624;
  display: inline-grid;
  transition: transform 0.3s;
  transform: perspective(800px) rotateY(0deg);
  transform-style: preserve-3d;
  grid-area: 1 / 1 / 1 / 1;
  &:hover {
    transform: perspective(800px) rotateY(180deg);
  }
`;

const cardContentStyle = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
  backface-visibility: hidden;
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

const sampleData = [
  {
    id: 1,
    title: '안녕 사랑',
    artist: '아티스트1',
    image: Logo,
    description: '신나는 사람들이 많이 듣는 노래',
  },
  {
    id: 2,
    title: '추억의 봄',
    artist: '아티스트2',
    image: Logo,
    description: '감성적인 분위기를 자아내는 노래',
  },
  {
    id: 3,
    title: '추억의 봄',
    artist: '아티스트2',
    image: Logo,
    description: '감성적인 분위기를 자아내는 노래',
  },
];

const MusicCardView = () => {
  const navigate = useNavigate();
  const [playlistData1, setPlaylistData1] = useState([]);
  const [playlistData2, setPlaylistData2] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setPlaylistData1(sampleData);
        setPlaylistData2(sampleData);
      } catch (error) {
        console.error('Error fetching playlist data:', error);
      }
    };

    fetchData();
  }, []);

  const handleNext = () => {
    navigate('/detail');
  };

  return (
    <Container>
      <div css={subContainerStyle}>
        <span css={subTitleStyle}>일기 작성이 완료 되었어요.</span>
        <span css={mainTitleStyle}>oo님을 위한 추천 노래를 확인하세요!</span>
        <div css={cardStyle}>
          <div css={cardFrontStyle}></div>
          <div css={cardBackStyle}>
            <div css={recommendLabelStyle}>설렌 오늘 이 노래는 어떤가요?</div>
            <div css={activityListStyle}>
              {playlistData1.map((item) => (
                <PlayListCell
                  key={item.id}
                  image={item.image}
                  title={item.title}
                  artist={item.artist}
                  description={item.description}
                />
              ))}
            </div>
            <div css={recommendLabelStyle}>00님은 슬플 때 이런 노래를 들었어요.</div>
            <div css={activityListStyle}>
              {playlistData2.map((item) => (
                <PlayListCell
                  key={item.id}
                  image={item.image}
                  title={item.title}
                  artist={item.artist}
                  description={item.description}
                />
              ))}
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
