// 년도 눌렀을 때 이동하는거 있 or 없
// 달력에 년도 표시 있 or 없
// 버튼에서 왜 마진이 안먹히지 안먹혀서 캘린더에 마진 넣어둠

/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';
import AppBarInMainScreen from '../../components/AppBarInMainScreen/AppBarInMainScreen';
import BottomNavigationBar from '../../components/BottomNavigationBar/BottomNavigationBar';
import colors from '../../Colors/Colors';
import PlayListCell from '../../components/PlayListCell/PlayListCell';
import emotionStyles from '../../components/EmotionStyles/EmotionStyles';
import Button from '../../components/Button/Button';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


const pageStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 0 auto;
  padding: 0;
  max-width: 800px;
  width: 100%;
  height: 100vh;
  font-family: 'Pretendard-Medium';
`;

// 날짜 표시 스타일
const dateLabelStyle = css`
  font-size: 20px;
  color: #2C3E50;
  margin: 10px 20px;
  font-family: 'Pretendard-Bold';
  align-self: flex-start;
`;

// 요일 표시 스타일
const dayOfWeekStyle = css`
  color: ${colors.mainBlue};
  font-family: 'Pretendard-Bold';
`;

const suggestionTextStyle = css`
  font-size: 18px;
  color: #34495E;
  margin: 0px 20px;
  margin-bottom: 10px;
  font-family: 'Pretendard-Bold';
  align-self: flex-start;
`;
const labelContainerStyle = css`
  width: 360px;
  height: 60px;
  margin-bottom: 20px;
`;

const sliderStyle = css`
  margin: 0px 20px; 
  width: 350px;
  height: 71px;

  .slick-dots {
    bottom: -25px; 

    li {
      margin: 0; 

      button {
        width: 12px; 
        height: 12px;

        &::before {
          font-size: 12px; 
          color: #DDF4F9;
          opacity: 1; 
        }
      }

      &.slick-active button::before {
        color: #CFCFCF;
      }
    }
  }
`;

const questionTextStyle = css`
  font-size: 15px;
  color: ${colors.black};
  margin: 0px 20px;
  margin-bottom: 10px;
  font-family: 'Pretendard-SemiBold';
`;
const underquestionTextStyle = css`
  font-size: 10px;
  color: ${colors.lightGray03};
  margin: 0px 20px;
  margin-bottom: 10px;
  font-family: 'Pretendard-Medium';
`;

const labelContainerStyle2 = css`
  margin: 0px;
`;

const headerStyle = css`
  width: 360px;
  height: 36px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px;
  margin-top: 50px;
  margin-bottom: 0px;

`;


const calendarStyle = css`
  .react-calendar {
    border: none;
    font-family: 'Pretendard-Medium';
    margin-bottom: 30px
  }

  // 각 날짜 칸의 크기 조정
  .react-calendar__tile {  
    width: 50px;
    height: 50px;
    max-width: none;
    font-size: 15px;  
  }

  // 요일 밑줄 제거
  .react-calendar__month-view__weekdays abbr { 
    text-decoration: none;
    font-weight: 800;
    font-size: 15px;

  }

  // 년/월 상단 네비게이션 칸 크기 줄이기
  .react-calendar__navigation__label {
    flex-grow: 0 !important;
    font-size: 15px !important;
    pointer-events: none;  // 클릭 불가능하게 만들기
  }

  // 네비게이션 가운데 정렬
  .react-calendar__navigation {
    justify-content: center;
  }

  // 네비게이션 화살표 크기 조정
  .react-calendar__navigation button {
    font-size: 25px; 
    
  }

  // 주말 날짜 색상 제거
  .react-calendar__month-view__days__day--weekend {  
    color: black;
  }

  // 오늘 날짜에 대한 스타일
  .react-calendar__tile--now {
      ${emotionStyles.today}; 
    
  }

  // 선택한 날짜 스타일 적용
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus,
  .react-calendar__tile--active {
    ${emotionStyles.select};
  }


`;

const todayButtonStyle = css`
  width: 43px;
  height: 28px;
  background-color: white;
  border: 1px solid ${colors.mainBlue};
  font-size: 15px;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: #e0e0e0;
  }
`;

const diaryStyle = css`
  .exciting {
    ${emotionStyles.exciting};
  }
  .happy {
    ${emotionStyles.happy}; 
  }
  .sad{
    ${emotionStyles.sad};
  }
  .angry{
    ${emotionStyles.angry};
  }
  .anxiety{
    ${emotionStyles.anxiety};
  }
  .today {
    ${emotionStyles.today};
  }
`;

// 감정 정보를 포함하는 일기 날짜 배열
const diaryEntries = [
  { date: new Date(2024, 4, 17), emotion: 'exciting' },
  { date: new Date(2024, 4, 23), emotion: 'happy' },
  { date: new Date(2024, 4, 30), emotion: 'angry' }
];


function getCurrentDateAndWeekday() {
    const date = new Date();
    const weekdays = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    const dayOfWeek = weekdays[date.getDay()];
  
    // 날짜를 YYYY.MM.DD 형식으로 포맷
    const formattedDate = date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).replace(/\. /g, '.').replace(/\.$/, '');
  
    return {
      formattedDate,
      dayOfWeek
    };
  }
  
const MainPage = () => {
  const { formattedDate, dayOfWeek } = getCurrentDateAndWeekday();
  const [date, setDate] = useState(new Date());
  const [activeStartDate, setActiveStartDate] = useState(new Date());


  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

const onChange = (newDate) => {
  setDate(newDate);
};

const goToToday = () => {
  const today = new Date();
  setDate(today);
  setActiveStartDate(today);
};

const formatShortWeekday = (locale, date) => {
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
  return weekDays[date.getDay()];
};

const formatMonthYear = (locale, date) => {
  return `${date.getMonth() + 1}월`;
  // return `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
};

const tileClassName = ({ date: tileDate, view }) => {
  if (view === 'month') {
    const foundEntry = diaryEntries.find(entry =>
      entry.date.getFullYear() === tileDate.getFullYear() &&
      entry.date.getMonth() === tileDate.getMonth() &&
      entry.date.getDate() === tileDate.getDate()
    );
    if (foundEntry) {
      return foundEntry.emotion; // 해당 날짜의 감정에 맞는 스타일 적용
    }
  }


};

  return (
    <div css={[pageStyle, calendarStyle, diaryStyle]}>
      <AppBarInMainScreen />
      <div css={labelContainerStyle}>
      <div css={dateLabelStyle}>
        {formattedDate} <span css={dayOfWeekStyle}>{dayOfWeek}</span>
      </div>
      <div css={suggestionTextStyle}>오늘 이 노래는 어떠세요?</div>
      </div>
      <Slider {...settings} css={sliderStyle}>
        <PlayListCell image="" title="여행" artist="볼빨간 사춘기" description="2024/02/12 외 5번" />
        <PlayListCell image="" title="투게더" artist="잔나비" description="2025/03/15 외 4번" />
        <PlayListCell image="" title="챔피언" artist="싸이" description="2023/12/11 외 3번" />
      </Slider>
      <div css={headerStyle}>
      <div css={labelContainerStyle2}>
        <div css={questionTextStyle}>오늘 하루 생각나는 노래가 있었나요?</div>
        <div css={underquestionTextStyle}>오늘의 일기와 플레이리스트를 만들어 보세요!</div>
      </div>
      <button onClick={goToToday} css={todayButtonStyle}>오늘</button>
      </div>
      <Calendar
        onChange={onChange}
        value={date}
        locale="en-US" 
        formatShortWeekday={formatShortWeekday}
        next2Label={null} 
        prev2Label={null}
        tileClassName={tileClassName}
        activeStartDate={activeStartDate}
        onActiveStartDateChange={({ activeStartDate }) => setActiveStartDate(activeStartDate)}
        formatMonthYear={formatMonthYear}
        />
      <Button 
        text="작성하기" 
        onClick={() => console.log('Selected Date:', date)}
        css={css`
          margin-top: 10px; // 왜 간격 조정안되냐 그래서 위에 추가했는데 흠 왜 안되지 찾아보자
        `}
      />
      <BottomNavigationBar />
    </div>
  );
};

export default MainPage;
