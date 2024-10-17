import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import SignUpPage from './pages/SignUpPage.tsx';
import Homepage from './pages/Homepage.tsx';
import './index.css';
import PostPage from './pages/PostPage.tsx';
import SearchPage from './pages/SearchPage.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
    errorElement: <ErrorPage />
  },
  {
    path: "/:postPage",
    element: <Homepage />
  },
  {
    path: "login",
    element: <LoginPage />
  },
  {
    path: "signup",
    element: <SignUpPage />
  },
  {
    path: "post/:postId",
    element: <PostPage />
  },
  {
    path: "search",
    element: <SearchPage />
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
