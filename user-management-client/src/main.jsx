import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AddUsers from './components/AddUsers.jsx';
import UpdateUser from './components/UpdateUser.jsx';
import AllUsers from './components/AllUsers.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[
      {
        path:"/users",
        element:<AllUsers/>,
        loader:()=> fetch('http://localhost:5000/users')
      },
      {
        path:"/addUsers",
        element:<AddUsers/>,
      },
      {
        path:"/updateUsers",
        element:<UpdateUser/>,
      }
    ]
  },
]);


// 
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}>
       <App />
    </RouterProvider>
  </StrictMode>,
)
