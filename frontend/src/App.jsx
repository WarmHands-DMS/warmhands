import { HomePage } from "./pages/HomePage/HomePage"
import {RouterProvider, createBrowserRouter} from "react-router-dom"
import { NewsPage } from "./pages/NewsPage/NewsPage"
import { Layout, RequireAuth } from "./layout/Layout"
import { UserProfilePage } from "./pages/UserProfilePage/UserProfilePage";
import { RegisterPage }  from "./pages/RegisterPage/RegisterPage"
import { SigninPage } from "./pages/SigninPage/SigninPage";
import 'react-toastify/dist/ReactToastify.css';
import { ProfileUpdatePage } from "./pages/ProfileUpdatePage/ProfileUpdatePage";
import { MapPage } from "./pages/MapPage/MapPage";
import {IncidentReportPage} from "./pages/IncidentReportPage/IncidentReportPage";
import { singlePageLoader } from "./lib/loaders";
import { IncidentPage } from "./pages/IncidentPage/IncidentPage";
import {ContactPage} from "./pages/ContactPage/ContactPage";

function App() {
  

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <HomePage />,
        },
        {
          path: '/news',
          element: <NewsPage />,
        },
        {
          path: '/:id',
          element: <IncidentPage />,
          loader: singlePageLoader,
        },
        {
          path: '/register',
          element: <RegisterPage />,
        },
        {
          path: '/signin',
          element: <SigninPage />,
        },
        {
          path: '/map',
          element: <MapPage />,
        },
        {
          path: '/contact',
          element: <ContactPage />,
        },
      ],
    },
    {
      path: '/',
      element: <RequireAuth />,
      children: [
        {
          path: '/profile',
          element: <UserProfilePage />,
        },
        {
          path: '/profile/update',
          element: <ProfileUpdatePage />,
        },
        {
          path: '/report',
          element: <IncidentReportPage />,
        },
      ],
    },
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App