import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Root, {loader as rootLoader} from './routes/root.jsx'
import ErrorCatchingPage from './error-page.jsx'
import Contact from './routes/contact.jsx'
const router=createBrowserRouter([
  {
    path:"/",
    element:<Root/>,
    errorElement:<ErrorCatchingPage/>,
    loader:rootLoader,
    children:[
      {
        path:"contacts/:contactId",
        element:<Contact/>
      }
    ]
  },
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
