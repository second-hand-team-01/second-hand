import { Layout, NavbarBtn } from '@components/commons';
import { createBrowserRouter } from 'react-router-dom';
import { HomePage, WritePage, LoginPage, WriteBtn } from '@pages/index';

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
        element: <HomePage />,
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
      { path: 'profile', element: <LoginPage /> },
    ],
  },
  {
    path: '/',
    element: (
      <Layout
        headerOption={{
          type: 'nav',
          navbarOptions: {
            title: '글 작성',
            leftBtn: <NavbarBtn text="닫기" path="/"></NavbarBtn>,
            rightBtn: <WriteBtn></WriteBtn>,
          },
        }}
        footerOption={{ type: 'tool' }}
      />
    ),
    children: [
      { path: 'write', element: <WritePage status="write" /> },
      { path: 'edit', element: <WritePage status="edit" /> },
    ],
  },
  {
    path: '/profile/signIn',
    element: <Layout />,
    children: [{ path: '', element: <div>Sign</div> }],
  },
]);
