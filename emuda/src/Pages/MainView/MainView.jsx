/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
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
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { apiUrl } from '../../config/config';

const pageStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 0;
  padding: 70px 0px;
  max-width: 800px;
  width: 100%;
  font-family: 'Pretendard-Medium';
`;

// 날짜 표시 스타일
const dateDivStyle = css`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
`;

const dateLabelStyle = css`
  font-size: 20px;
  display: block;
  color: #2c3e50;
  margin: 10px 20px;
  font-family: 'Pretendard-Bold';
`;

// 요일 표시 스타일
const dayOfWeekStyle = css`
  display: block;
  color: ${colors.mainBlue};
  font-size: 20px;
  font-family: 'Pretendard-Bold';
`;

const suggestionTextStyle = css`
  font-size: 15px;
  color: #34495e;
  margin: 0px 20px 0px 20px;
  font-family: 'Pretendard-SemiBold';
  align-self: flex-start;
  box-sizing: border-box;
`;

const labelContainerStyle = css`
  width: 100%;
  height: 60px;
`;

const cellContainerStyle = css`
  width: 100%;
  padding: 20px 0px 50px 0px;
`;

const sliderStyle = css`
  width: 100%;
  height: auto;
  box-sizing: border-box;
  /* overflow: hidden; */

  .slick-dots {
    margin-top: 25px;
    display: flex;

    li {
      margin: 0;

      button {
        &::before {
          font-size: 12px;
          color: #ddf4f9;
          opacity: 1;
        }
      }

      &.slick-active button::before {
        color: #cfcfcf;
      }
    }
  }
`;

const questionTextStyle = css`
  width: 100%;
  font-size: 15px;
  color: ${colors.black};
  margin: 0px 20px 10px 20px;
  box-sizing: border-box;
  font-family: 'Pretendard-SemiBold';
`;
const underquestionTextStyle = css`
  font-size: 10px;
  color: ${colors.lightGray03};
  margin: 0px 20px 10px 20px;
  box-sizing: border-box;
  font-family: 'Pretendard-Medium';
`;

const labelContainerStyle2 = css`
  margin: 0px;
`;

const headerStyle = css`
  width: 100%;
  height: 36px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 5px 0px 5px;
  box-sizing: border-box;
`;

const calendarStyle = css`
  .react-calendar {
    border: none;
    font-family: 'Pretendard-Medium';
    margin-bottom: 30px;
  }

  // 각 날짜 칸의 크기 조정
  .react-calendar__tile {
    width: 50px;
    height: 50px;
    font-size: 15px;
  }

  // 요일 밑줄 제거
  .react-calendar__month-view__weekdays abbr {
    text-decoration: none;
    font-weight: 800;
    font-size: 15px;
  }

  .react-calendar__month-view__weekdays abbr {
    text-decoration: none;
    font-weight: 800;
    font-size: 15px;
  }

  // 년/월 상단 네비게이션 칸 크기 줄이기
  .react-calendar__navigation__label {
    flex-grow: 0 !important;
    font-size: 15px !important;
    pointer-events: none; // 클릭 불가능하게 만들기
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
    ${emotionStyles.TODAY};
  }

  // 선택한 날짜 스타일 적용
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus,
  .react-calendar__tile--active {
    ${emotionStyles.SELECT};
  }
`;

const todayButtonStyle = css`
  width: 43px;
  height: 28px;

  background-color: white;
  border: 1px solid ${colors.mainBlue};
  font-size: 15px;
  border-radius: 10px;
  margin-right: 20px;
  cursor: pointer;
  &:hover {
    background-color: #e0e0e0;
  }
`;

const diaryStyle = css`
  .HAPPY {
    border: 1.5px solid white;
    ${emotionStyles.HAPPY};
  }
  .SAD {
    border: 1.5px solid white;
    ${emotionStyles.SAD}
  }
  .ANGRY {
    border: 1.5px solid white;
    ${emotionStyles.ANGRY};
  }
  .ANXIETY {
    border: 1.5px solid white;
    ${emotionStyles.ANXIETY};
  }
  .ROMANCE {
    border: 1.5px solid white;
    ${emotionStyles.ROMANCE};
  }
  .TODAY {
    border: 1.5px solid white;
    ${emotionStyles.TODAY};
  }
`;

function getCurrentDateAndWeekday() {
  const date = new Date();
  const weekdays = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
  const dayOfWeek = weekdays[date.getDay()];

  const formattedDate = date
    .toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\. /g, '.')
    .replace(/\.$/, '');

  return {
    formattedDate,
    dayOfWeek,
  };
}

function getCurrentDate() {
  const date = new Date();

  const formattedDate = date
    .toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\./g, '-')
    .replace(/ /g, '')
    .replace(/-/g, '-')
    .slice(0, 10);

  return formattedDate;
}
const MainPage = () => {
  const [playlist, setPlaylist] = useState([]);
  const { formattedDate, dayOfWeek } = getCurrentDateAndWeekday();
  const currentDate = getCurrentDate();
  const [date, setDate] = useState(new Date());
  const [activeStartDate, setActiveStartDate] = useState(new Date());
  const navigate = useNavigate();
  const memberId = localStorage.getItem('memberId');
  const [diaryEntries, setDiaryEntries] = useState([]);
  const [buttonText, setButtonText] = useState();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const fetchDiaryEntries = async () => {
      try {
        const yearMonth = `${activeStartDate.getFullYear()}-${String(activeStartDate.getMonth() + 1).padStart(2, '0')}-01`;
        const response = await axios.get(
          `${apiUrl}/api/diary/monthly/${memberId}?YearMonth=${yearMonth}`
        );
        if (response.data.isSuccess) {
          const entries = response.data.result.map((entry) => ({
            date: new Date(entry.writtenDate),
            emotion: entry.memberEmotion,
            id: entry.id,
          }));
          setDiaryEntries(entries);
        }
      } catch (error) {
        console.error('Failed to fetch diary entries', error);
      }
    };
    fetchDiaryEntries();
  }, [activeStartDate, memberId]);

  const updatePreferencePlaylist = async () => {
    try {
      console.log('취향플리 업데이트중');
      const response = await axios.put(`${apiUrl}/api/playlist/preference/update`, {
        memberId: parseInt(memberId),
        date: currentDate,
      });
      console.log('Update response:', response.data);
      fetchPreferencePlaylist();
    } catch (error) {
      console.log('오류가 발생했습니다.', error);
    }
  };

  const fetchPreferencePlaylist = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/playlist/preference/musics/${memberId}`);
      if (response.data.isSuccess) {
        console.log('Fetch response:', response.data.result);
        setPlaylist(response.data.result);
      }
    } catch (error) {
      console.error('Failed to fetch preference playlist', error);
    }
  };

  useEffect(() => {
    updatePreferencePlaylist();
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const onChange = (newDate) => {
    console.log(
      '선택된 날짜: ',
      newDate
        .toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
        .replace(/\. /g, '-')
        .replace(/\.$/, '')
    );
    setDate(newDate);

    const foundEntry = diaryEntries.find(
      (entry) =>
        entry.date.getFullYear() === newDate.getFullYear() &&
        entry.date.getMonth() === newDate.getMonth() &&
        entry.date.getDate() === newDate.getDate()
    );

    if (foundEntry) {
      setButtonText('보러가기');
    } else {
      setButtonText('작성하기');
    }
    setShowButton(true);
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
    // return `${date.getMonth() + 1}월`;
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
  };
  const tileClassName = ({ date: tileDate, view }) => {
    if (view === 'month') {
      const foundEntry = diaryEntries.find(
        (entry) =>
          entry.date.getFullYear() === tileDate.getFullYear() &&
          entry.date.getMonth() === tileDate.getMonth() &&
          entry.date.getDate() === tileDate.getDate()
      );
      if (foundEntry) {
        return foundEntry.emotion;
      }
    }
    return null;
  };

  const handleWriteClick = () => {
    const formattedDate = date
      .toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/\. /g, '-')
      .replace(/\.$/, '');

    const foundEntry = diaryEntries.find(
      (entry) =>
        entry.date.getFullYear() === date.getFullYear() &&
        entry.date.getMonth() === date.getMonth() &&
        entry.date.getDate() === date.getDate()
    );

    if (foundEntry) {
      console.log('Navigating to write view with date: ', foundEntry.id);
      navigate('/detail', { state: { diaryId: foundEntry.id } });
    } else {
      console.log('Navigating to write view with date: ', formattedDate);
      navigate('/write', { state: { selectedDate: formattedDate } });
    }

    // 충돌 해결 부분
    localStorage.setItem('musics', JSON.stringify([]));
  };

  return (
    <div css={[pageStyle, calendarStyle, diaryStyle]}>
      <AppBarInMainScreen />
      <div css={labelContainerStyle}>
        <div css={dateDivStyle}>
          <span css={dateLabelStyle}>{formattedDate}</span>
          <span css={dayOfWeekStyle}>{dayOfWeek}</span>
        </div>
        <div css={suggestionTextStyle}>오늘 이 노래는 어떠세요?</div>
      </div>
      {playlist.length > 0 ? (
        <div css={cellContainerStyle}>
          <Slider {...settings} css={sliderStyle}>
            {playlist.map((item) => (
              <PlayListCell
                key={item.id}
                image={item.pictureKey}
                title={item.title}
                artist={item.artist}
              />
            ))}
          </Slider>
        </div>
      ) : (
        <div
          css={css`
            margin: 10px 0px;
            height: 70px;
            width: calc(100% - 30px);
            background-color: ${colors.lightGray02};
            border-radius: 7px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Pretendard-Light';
            font-size: 14px;
            color: #666;
            box-sizing: border-box;
          `}
        >
          아직 취향을 생성하지 않았어요 💦
        </div>
      )}
      <div css={headerStyle}>
        <div css={labelContainerStyle2}>
          <div css={questionTextStyle}>오늘 하루 생각나는 노래가 있었나요?</div>
          <div css={underquestionTextStyle}>오늘의 일기와 플레이리스트를 만들어 보세요!</div>
        </div>
        <button onClick={goToToday} css={todayButtonStyle}>
          오늘
        </button>
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
      {showButton && <Button text={buttonText} onClick={handleWriteClick} />}{' '}
      <BottomNavigationBar />
    </div>
  );
};

export default MainPage;
