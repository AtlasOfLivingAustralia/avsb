import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <div>Home page</div>,
  },
  {
    path: '/bye',
    element: <div>Bye guys</div>,
  },
]);

function Router() {
  return <RouterProvider router={routes} />;
}

export default Router;
