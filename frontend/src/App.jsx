import { HomePage } from "./pages/HomePage/HomePage"
import {RouterProvider, createBrowserRouter} from "react-router-dom"
import { NewsPage } from "./pages/NewsPage/NewsPage"
import { Layout } from "./layout/Layout"
import { DisasterPage } from "./pages/DisasterPage/DisasterPage";
import { UserProfilePage } from "./pages/UserProfilePage/UserProfilePage";
import { RegisterPage }  from "./pages/RegisterPage/RegisterPage"
import { SigninPage } from "./pages/SigninPage/SigninPage";
import 'react-toastify/dist/ReactToastify.css';

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
          element: <DisasterPage />,
        },
        {
          path: '/profile',
          element: <UserProfilePage/>
        },
        {
          path: '/register',
          element: <RegisterPage/>
        },
        {
          path: '/signin',
          element: <SigninPage/>
        },
      ],
    },
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App