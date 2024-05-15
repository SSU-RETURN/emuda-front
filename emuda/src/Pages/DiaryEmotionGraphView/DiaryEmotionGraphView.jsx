/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import '../../Fonts/Font.css';
import colors from '../../Colors/Colors';
import EmotionChart from '../../components/EmotionChart/EmotionChart';

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
  margin: 50px 22px 0px 22px;
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

const graphContainerStyle = css`
  width: 100%;
  height: auto;
  aspect-ratio: ${352 / 581};
  display: flex;
`;

const noticeTitleStyle = css`
  width: 100%;
  font-family: 'Pretendard-Medium';
  font-size: 8px;
  color: ${colors.lightGray03};
  text-align: right;
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

const sampleData = [20, 17, 22, 40, 0];

const DiaryEmotionGraphView = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/card');
  };

  return (
    <Container>
      <div css={subContainerStyle}>
        <span css={subTitleStyle}>일기 작성이 완료 되었어요.</span>
        <span css={mainTitleStyle}>작성한 일기의 감정 비율을 확인해보세요!</span>
      </div>
      <div css={graphContainerStyle}>
        <EmotionChart data={sampleData} height="100%" />
      </div>
      <span css={noticeTitleStyle}>*감정 분석 결과가 개인의 감정과 차이가 있을 수 있습니다. </span>
      <div css={fixButtonBoxStyle}>
        <Button text="다음" onClick={handleNext} />
      </div>
    </Container>
  );
};

export default DiaryEmotionGraphView;
