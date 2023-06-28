import { createBrowserRouter } from 'react-router-dom';
import {
  HomePage,
  WritePage,
  LoginPage,
  DetailsPage,
  SignUpPage,
  AuthPage,
  SalesHistoryPage,
  FavoritesPage,
  ChatPage,
  ChatDetailsPage,
} from '@pages/index';

export const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      { path: 'sales-history', element: <SalesHistoryPage /> },
      { path: 'favorites', element: <FavoritesPage /> },
      { path: 'chat', element: <ChatPage></ChatPage> },
      {
        path: 'chat/:itemIdx/:chatIdx',
        element: <ChatDetailsPage></ChatDetailsPage>,
      },
      { path: 'chat/:itemIdx', element: <ChatPage></ChatPage> },
      { path: 'profile', element: <LoginPage /> },
      { path: 'write', element: <WritePage type="write" /> },
      { path: 'edit/:itemIdx', element: <WritePage type="edit" /> },
      { path: 'item/:itemIdx', element: <DetailsPage></DetailsPage> },
      { path: 'signUp', element: <SignUpPage /> },
      { path: 'redirect/oauth', element: <AuthPage /> },
    ],
  },
]);
