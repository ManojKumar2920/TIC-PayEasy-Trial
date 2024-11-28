import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './pages/Dashboard';

const router = createBrowserRouter([
  {
    path: "/", 
    element: <Navigate to="/login" replace /> // Redirect to /login
  },
  {
    path: "/login", 
    element: <Login />, 
  },
  {
    path: "/signup", 
    element: <Register />, 
  },
  {
    path: "/dashboard", 
    element: <Dashboard />, 
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
