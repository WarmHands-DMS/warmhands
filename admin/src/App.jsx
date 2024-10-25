import { HomePage } from './pages/HomePage/HomePage';
import { LoginPage } from './pages/LoginPage/LoginPage';
// import { SinglePage } from './pages/SinglePage/SinglePage';
import { New } from './pages/New/New';
import { DisasterListPage } from './pages/DisasterListPage/DisasterListPage';
import { UserListPage } from './pages/UserListPage/UserListPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { singlePageLoader } from './lib/loaders';
import { IncidentPage } from './pages/IncidentPage/IncidentPage';

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
    loader: singlePageLoader,
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
  return <RouterProvider router={router} />;
}

export default App;
