import { HomePage } from './pages/HomePage/HomePage';
import 'react-toastify/dist/ReactToastify.css';
import { DisasterListPage } from './pages/DisasterListPage/DisasterListPage';
import { UserListPage } from './pages/UserListPage/UserListPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { IncidentPageLoader, SendEmailPageLoader } from './lib/loaders';
import { IncidentPage } from './pages/IncidentPage/IncidentPage';
import { SendEmailPage } from './pages/SendEmailPage/SendEmailPage';
import { SigninPage } from './pages/SigninPage/SigninPage';
import { AuthLayout } from './layout/Layout';
import { EmailListPage } from './pages/EmailListPage/EmailListPage';
import { AdminListPage } from './pages/AdminListPage/AdminLisPage';
import { AdminProfilePage } from './pages/AdminProfilePage/AdminProfilePage';
import { RegisterPage } from './pages/RegisterPage/RegisterPage';

const router = createBrowserRouter([
  {
    path: '/signin',
    element: <SigninPage />,
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/signin',
        element: <SigninPage />,
      },
      {
        path: '/:id',
        element: <IncidentPage />,
        loader: IncidentPageLoader,
      },
      {
        path: '/:id/send-emails',
        element: <SendEmailPage />,
        loader: SendEmailPageLoader,
      },
      {
        path: 'users',
        element: <UserListPage />,
      },
      {
        path: 'disasters',
        element: <DisasterListPage />,
      },
      {
        path: 'mails',
        element: <EmailListPage />,
      },
      {
        path: 'admins',
        element: <AdminListPage />,
      },
      {
        path: 'profile',
        element: <AdminProfilePage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
    ],
  },
]);

function App() {
   return (
       <RouterProvider router={router} />
   );
}

export default App;
