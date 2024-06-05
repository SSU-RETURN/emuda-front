import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RecommendationView from './Pages/RecommendationView/RecommendationView.jsx';
import PlayListView from './Pages/PlayListView/PlayListView.jsx';
import MoreRecommendationView from './Pages/RecommendationView/MoreRecommendationView/MoreRecommendationView.jsx';
import WriteDiaryView from './Pages/WriteDiaryView/WriteDiaryView.jsx';
import DetailDiaryView from './Pages/DetailDiaryView/DetailDiaryView.jsx';
import MusicCardView from './Pages/MusicCardView/MusicCardView.jsx';
import SearchMusicView from './Pages/SearchMusicView/SearchMusicView.jsx';
import SignUpView from './Pages/SignUpView/SignUpView.jsx';
import LoginView from './Pages/LoginView/LoginView.jsx';
import SignUpComView from './Pages/SignUpView/SignUpComView.jsx';
import MainPage from './Pages/MainView/MainView.jsx';
import PreferStart from './Pages/PreferView/PreferStartView.jsx';
import PreferFirst from './Pages/PreferView/PreferFirstView.jsx';
import PreferSecond from './Pages/PreferView/PreferSecondView.jsx';
import PreferFin from './Pages/PreferView/PreferFinView.jsx';
import DiaryEmotionGraphView from './Pages/DiaryEmotionGraphView/DiaryEmotionGraphView.jsx';
import SettingView from './Pages/SettingVIew/SettingView.jsx';
import EditMemberInfoView from './Pages/EditMemberInfoView/EditMemberInfoView.jsx';
import TodayRecommendationView from './Pages/RecommendationView/MoreRecommendationView/TodayRecommendationView.jsx';
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  { path: '/detail', element: <DetailDiaryView /> },
  { path: '/write', element: <WriteDiaryView /> },
  { path: '/edit', element: <WriteDiaryView /> },
  { path: '/emotionGraph', element: <DiaryEmotionGraphView /> },
  { path: '/card', element: <MusicCardView /> },
  { path: '/search', element: <SearchMusicView /> },
  {
    path: '/recommend',
    //추후에 server과의 연결할 때 여기에도 함수 추가해야 합니다
    element: <RecommendationView isDiaryWritten={true} />,
  },
  { path: '/library', element: <PlayListView /> },
  { path: '/more', element: <MoreRecommendationView /> },
  { path: '/todayRecommend', element: <TodayRecommendationView /> },

  { path: '/login', element: <LoginView /> },
  { path: '/signup', element: <SignUpView /> },
  { path: '/signupcom', element: <SignUpComView /> },

  { path: '/main', element: <MainPage /> },
  { path: '/setting', element: <SettingView /> },
  { path: '/editMemberInfo', element: <EditMemberInfoView /> },
  { path: '/preferstart', element: <PreferStart /> },
  { path: '/preferfirst', element: <PreferFirst /> },
  { path: '/prefersecond', element: <PreferSecond /> },
  { path: '/preferfin', element: <PreferFin /> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
