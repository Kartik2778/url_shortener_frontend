import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import HomePage from './components/HomePage.jsx';
import AboutPage from './components/AboutPage.jsx';
import Login from './components/Login.jsx';  
import Register from './components/Register.jsx';
import PageNotFound from './components/PageNotFound.jsx';

import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard.jsx';
import UserDashboard from './components/UserDashboard.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true, 
        element: <HomePage />
      },
      {
        path: "about",
        element: <AboutPage />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "*",
        element: <PageNotFound />
      },
      {
        path: "/ADMIN",
        element: <AdminDashboard/>
      },
      {
        path: "/USER",
        element: <UserDashboard/>
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
