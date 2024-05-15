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

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  { path: '/detail', element: <DetailDiaryView /> },
  { path: '/write', element: <WriteDiaryView /> },
  { path: '/edit', element: <WriteDiaryView /> },
  { path: '/card', element: <MusicCardView /> },
  { path: '/search', element: <SearchMusicView /> },
  {
    path: '/recommend',
    //추후에 server과의 연결할 때 여기에도 함수 추가해야 합니다
    element: <RecommendationView isDiaryWritten={true} />,
  },
  { path: '/library', element: <PlayListView /> },
  { path: '/more', element: <MoreRecommendationView /> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
