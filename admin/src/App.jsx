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

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <HomePage />
//   },
//   {
//     path: '/signin',
//     element: <SigninPage />
//   },

//   {
//     path: 'login',
//     element: <LoginPage />,
//   },
//   {
//     path: '/:id',
//     element: <IncidentPage />,
//     loader: IncidentPageLoader,
//   },
//   {
//     path: '/:id/send-emails',
//     element: <SendEmailPage />,
//     loader: SendEmailPageLoader,
//   },
//   {
//     path: 'users',
//     element: <UserListPage />,
//     children: [
//       // {
//       //   path: ':userId',
//       //   element: <SinglePage />,
//       // },
     
//     ],
//   },
//   {
//     path: 'disasters',
//     element: <DisasterListPage />,
//   },
// ]);

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
        children: [
          // {
          //   path: ':userId',
          //   element: <SinglePage />,
          // },
        ],
      },
      {
        path: 'disasters',
        element: <DisasterListPage />,
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
