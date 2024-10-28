import { HomePage } from './pages/HomePage/HomePage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { ToastProvider } from './lib/ToastContext';
import 'react-toastify/dist/ReactToastify.css';
import { New } from './pages/New/New';
import { DisasterListPage } from './pages/DisasterListPage/DisasterListPage';
import { UserListPage } from './pages/UserListPage/UserListPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { IncidentPageLoader, SendEmailPageLoader } from './lib/loaders';
import { IncidentPage } from './pages/IncidentPage/IncidentPage';
import { SendEmailPage } from './pages/SendEmailPage/SendEmailPage';
import { ToastContainer } from 'react-toastify';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <div>Something went wrong!</div>, // Optional error fallback
  },
  {
    path: 'login',
    element: <LoginPage />,
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
    children: [
      // {
      //   path: ':userId',
      //   element: <SinglePage />,
      // },
      {
        path: 'new',
        element: <New />,
      },
    ],
  },
  {
    path: 'disasters',
    element: <DisasterListPage />,
  },
]);

function App() {
   return (
     <ToastProvider>
       <RouterProvider router={router} />
       <ToastContainer position="top-right" autoClose={3000} />
     </ToastProvider>
   );
}

export default App;
