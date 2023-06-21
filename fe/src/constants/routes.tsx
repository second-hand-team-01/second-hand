import { Layout, NavbarBtn } from '@components/commons';
import { createBrowserRouter } from 'react-router-dom';
import { HomePage, WritePage, LoginPage } from '@pages/index';
import { useNavigate } from 'react-router-dom';

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
            leftBtn: <NavbarBtn text="뒤로" path="/"></NavbarBtn>,
            rightBtn: (
              <NavbarBtn
                text="완료"
                onClick={() => console.log('완료')}
              ></NavbarBtn>
            ),
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
