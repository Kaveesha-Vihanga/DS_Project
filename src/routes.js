import { createBrowserRouter } from 'react-router';
import Layout from './components/Layout';
import Home from './pages/Home';
import RegionalDemand from './pages/RegionalDemand';
import Analytics from './pages/Analytics';
import ReviewScore from './pages/ReviewScore';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'regional-demand', Component: RegionalDemand },
      { path: 'review-score', Component: ReviewScore },
      { path: 'analytics', Component: Analytics },
    ],
  },
]);
