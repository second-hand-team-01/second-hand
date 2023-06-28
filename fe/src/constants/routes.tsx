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
      { path: 'chat/:chatIdx', element: <ChatDetailsPage></ChatDetailsPage> },
      { path: 'profile', element: <LoginPage /> },
      { path: 'write', element: <WritePage type="write" /> },
      { path: 'edit/:itemIdx', element: <WritePage type="edit" /> },
      { path: '', element: <div>Sign</div> },
      { path: 'item/:itemIdx', element: <DetailsPage></DetailsPage> },
      { path: 'signUp', element: <SignUpPage /> },
      { path: 'item/:itemIdx', element: <div>내용</div> },
      { path: 'redirect/oauth', element: <AuthPage /> },
    ],
  },
]);
