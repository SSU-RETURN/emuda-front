import React from 'react';
import ReactDOM from 'react-dom/client';
import { Global, css } from '@emotion/react';
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
import ProtectedRoute from './core/ProtectedRoute';
import { AuthProvider } from './core/AuthContext';

const globalStyles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
    font-family: 'Pretendard-Medium', sans-serif;
    min-height: 100vh;
  }
`;

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/main',
    element: (
      <ProtectedRoute>
        <MainPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/detail',
    element: (
      <ProtectedRoute>
        <DetailDiaryView />
      </ProtectedRoute>
    ),
  },
  {
    path: '/write',
    element: (
      <ProtectedRoute>
        <WriteDiaryView />
      </ProtectedRoute>
    ),
  },
  {
    path: '/edit',
    element: (
      <ProtectedRoute>
        <WriteDiaryView />
      </ProtectedRoute>
    ),
  },
  {
    path: '/emotionGraph',
    element: (
      <ProtectedRoute>
        <DiaryEmotionGraphView />
      </ProtectedRoute>
    ),
  },
  {
    path: '/card',
    element: (
      <ProtectedRoute>
        <MusicCardView />
      </ProtectedRoute>
    ),
  },
  {
    path: '/search',
    element: (
      <ProtectedRoute>
        <SearchMusicView />
      </ProtectedRoute>
    ),
  },
  {
    path: '/recommend',
    element: (
      <ProtectedRoute>
        <RecommendationView isDiaryWritten={true} />
      </ProtectedRoute>
    ),
  },
  {
    path: '/library',
    element: (
      <ProtectedRoute>
        <PlayListView />
      </ProtectedRoute>
    ),
  },
  {
    path: '/more',
    element: (
      <ProtectedRoute>
        <MoreRecommendationView />
      </ProtectedRoute>
    ),
  },
  {
    path: '/todayRecommend',
    element: (
      <ProtectedRoute>
        <TodayRecommendationView />
      </ProtectedRoute>
    ),
  },
  { path: '/login', element: <LoginView /> },
  { path: '/signup', element: <SignUpView /> },
  { path: '/signupcom', element: <SignUpComView /> },
  { path: '/setting', element: <SettingView /> },
  { path: '/editMemberInfo', element: <EditMemberInfoView /> },
  { path: '/preferstart', element: <PreferStart /> },
  { path: '/preferfirst', element: <PreferFirst /> },
  { path: '/prefersecond', element: <PreferSecond /> },
  { path: '/preferfin', element: <PreferFin /> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <Global styles={globalStyles} />
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
