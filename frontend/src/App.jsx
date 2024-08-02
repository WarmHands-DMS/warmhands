import { HomePage } from "./pages/HomePage/HomePage"
import {RouterProvider, createBrowserRouter} from "react-router-dom"
import { NewsPage } from "./pages/NewsPage/NewsPage"
import { Layout } from "./layout/Layout"
import { DisasterPage } from "./pages/DisasterPage/DisasterPage";
import { UserProfilePage } from "./pages/UserProfilePage/UserProfilePage";

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
        }
      ],
    },
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App