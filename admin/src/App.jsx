import { HomePage } from "./pages/HomePage/HomePage"
import { LoginPage } from "./pages/LoginPage/LoginPage"
import { Single } from './pages/Single/Single'
import { New } from './pages/New/New'
import { List } from './pages/List/List';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="users">
            <Route index element={<List />} />
            <Route path=":userId" element={<Single />} />
            <Route path="new" element={<New />} />
          </Route>
          <Route path="disasters">
            <Route index element={<List />} />
            <Route path=":disasterId" element={<Single />} />
            {/* <Route path="new" element={<New />} /> */}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );

  // const router = createBrowserRouter([
  //   {
  //     path: '/',
  //     element: <HomePage />,
  //   },
  //   {
  //     path: '/login',
  //     element: <LoginPage />,
  //   },
  //   {
  //     path: '/users',
  //     element: <List />,
  //     children: [
  //       {
  //         path: '/userId',
  //         element: <Single />,
  //       },
  //       {
  //         path: '/new',
  //         element: <New />,
  //       },
  //     ],
  //   },
  //   {
  //     path: '/disasters',
  //     element: <List />,
  //     children: [
  //       {
  //         path: '/disasterId',
  //         element: <Single />,
  //       },
  //       {
  //         path: '/new',
  //         element: <New />,
  //       },
  //     ],
  //   },
  // ]);

  // return (
  //   <RouterProvider router={router} />
  // )


  
}

export default App