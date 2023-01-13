import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <div>Hello guys</div>,
  },
]);

function Router() {
  return <RouterProvider router={routes} />;
}

export default Router;
