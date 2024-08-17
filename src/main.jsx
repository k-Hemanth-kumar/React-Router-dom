import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Root, {loader as rootLoader,action as rootAction} from './routes/root.jsx'
import ErrorCatchingPage from './error-page.jsx'
import Contact, { loader as contactLoader,action as contactAction } from './routes/contact.jsx'
import EditContact,{action as editAction} from './routes/edit.jsx'
import { action as deleteAction } from './routes/destroy.jsx'
import Index from './routes/index.jsx'
const router=createBrowserRouter([
  {
    path:"/",
    element:<Root/>,
    errorElement:<ErrorCatchingPage/>,
    loader:rootLoader,
    action:rootAction,
    children:[
      {
        errorElement:<ErrorCatchingPage/>,
        children:[
          {
            index:true,
            element:<Index/>
          },
          {
            path:"contacts/:contactId",
            element:<Contact/>,
            loader:contactLoader,
            action:contactAction
          },
          {
            path:"contacts/:contactId/edit",
            element:<EditContact/>,
            loader:contactLoader,
            action:editAction
          },
          {
            path:'contacts/:contactId/destroy',
            action: deleteAction,
            errorElement: <div>OOPs, something went wrong</div>
          }
        ]
        
      }
    ]
  },
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
