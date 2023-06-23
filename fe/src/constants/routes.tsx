import { createBrowserRouter } from 'react-router-dom';
import {
  HomePage,
  WritePage,
  LoginPage,
  DetailsPage,
  SignUpPage,
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
      { path: 'write', element: <WritePage status="write" /> },
      { path: 'edit', element: <WritePage status="edit" /> },
      { path: '', element: <div>Sign</div> },
      { path: 'item/:itemIdx', element: <DetailsPage></DetailsPage> },
      { path: 'signup', element: <SignUpPage /> },
      { path: 'item/:itemIdx', element: <div>내용</div> },
      { path: '', element: <div>Sign</div> },
      { path: 'item/:itemIdx', element: <DetailsPage></DetailsPage> },
      { path: 'signup', element: <SignUpPage /> },
      { path: 'item/:itemIdx', element: <div>내용</div> },
    ],
  },
]);
