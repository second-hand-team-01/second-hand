import { Layout } from '@components/commons';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout hasTabBar={true} />,
    children: [
      { path: '/', element: <div>Home</div> },
      { path: 'sales-history', element: <div>Sales-history</div> },
      { path: 'favorites', element: <div>Favorites</div> },
      { path: 'chat', element: <div>Chat</div> },
      { path: 'profile', element: <div>Profile</div> },
    ],
  },
  {
    path: '/profile/signIn',
    element: <Layout hasTabBar={false} />,
    children: [{ path: '', element: <div>Sign</div> }],
  },
]);
