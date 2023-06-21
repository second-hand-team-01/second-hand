import { Layout } from '@components/commons';
import { createBrowserRouter } from 'react-router-dom';
import { Home } from '@pages/index';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout
        headerOption={{ type: 'filter' }}
        footerOption={{ type: 'tab' }}
      />
    ),
    children: [
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
  {
    path: '/',
    element: <Layout footerOption={{ type: 'tab' }} />,
    children: [
      { path: 'sales-history', element: <div>Sales-history</div> },
      { path: 'favorites', element: <div>Favorites</div> },
      { path: 'chat', element: <div>Chat</div> },
      { path: 'profile', element: <div>Profile</div> },
    ],
  },
  {
    path: '/',
    element: <Layout />,
    children: [{ path: 'write', element: <div>Write</div> }],
  },
  {
    path: '/profile/signIn',
    element: <Layout />,
    children: [{ path: '', element: <div>Sign</div> }],
  },
]);
