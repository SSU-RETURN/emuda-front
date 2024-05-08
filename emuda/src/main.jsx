import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RecommendationView from './Pages/RecommendationView/RecommendationView.jsx';
import PlayListView from './Pages/PlayListView/PlayListView.jsx';
import MoreRecommendationView from './Pages/RecommendationView/MoreRecommendationView/MoreRecommendationView.jsx';
import WriteDiaryView from './Pages/WriteDiaryView/WriteDiaryView.jsx';
// import SearchMusicView from './Pages/SearcjMusicView/SearchMusicView.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  { path: '/write', element: <WriteDiaryView /> },
  { path: '/edit', element: <WriteDiaryView /> },
  {
    path: '/recommend',
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
