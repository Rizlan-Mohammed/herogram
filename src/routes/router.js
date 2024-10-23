import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import AuthLayout from '../layouts/AuthLayout';
import AuthenticationUI from '../components/AuthenticationUI';
import AppLayout from '../layouts/AppLayout';
import FileManager from '../pages/FileManager';
import SharedMedia from '../pages/FileManager/SharedMedia';
import SharedLayout from '../layouts/SharedLayout';
import ProtectedRoute from './ProtectedRoute';

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />, 
    children: [
      {
        path: "/",
        element: <AuthenticationUI />,
      },
    ],
  },
  {
    path: "/dashboard", 
    element: <ProtectedRoute element={<AppLayout />} />, 
    children: [
      {
        path: "",
        element: <FileManager  />,
      },
    ],
  },
  {
    path: "/media/share/:shareId", 
    element: <SharedLayout />, 
    children: [
      {
        path: "",
        element: <SharedMedia />,
      },
    ],
  },
]);

export default router;
