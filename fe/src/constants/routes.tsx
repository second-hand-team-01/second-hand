import { createBrowserRouter } from 'react-router-dom';
import {
  HomePage,
  WritePage,
  LoginPage,
  DetailsPage,
  SignUpPage,
  AuthPage,
} from '@pages/index';

export const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      { path: 'sales-history', element: <div>Sales-history</div> },
      { path: 'favorites', element: <div>Favorites</div> },
      { path: 'chat', element: <div>Chat</div> },
      { path: 'profile', element: <LoginPage /> },
      { path: '', element: <div>Sign</div> },
      { path: 'write', element: <WritePage /> },
      { path: 'edit', element: <WritePage /> },
      { path: 'item/:itemIdx', element: <DetailsPage></DetailsPage> },
      { path: 'signUp', element: <SignUpPage /> },
      { path: 'item/:itemIdx', element: <div>내용</div> },
      { path: 'redirect/oauth', element: <AuthPage /> },
    ],
  },
]);
