import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Root, {loader as rootLoader,action as rootAction} from './routes/root.jsx'
import ErrorCatchingPage from './error-page.jsx'
import Contact, { loader as contactLoader } from './routes/contact.jsx'
import EditContact,{action as editAction} from './routes/edit.jsx'
const router=createBrowserRouter([
  {
    path:"/",
    element:<Root/>,
    errorElement:<ErrorCatchingPage/>,
    loader:rootLoader,
    action:rootAction,
    children:[
      {
        path:"contacts/:contactId",
        element:<Contact/>,
        loader:contactLoader
      },
      {
        path:"contacts/:contactId/edit",
        element:<EditContact/>,
        loader:contactLoader,
        action:editAction
      }
    ]
  },
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
