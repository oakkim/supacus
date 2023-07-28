import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import './index.css'
import Widget from './pages/widget/index.tsx'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Provider } from 'react-redux'
import store from './stores/index'
import Login from './pages/login/index.tsx'
import LoginCompleted from './pages/login/LoginCompleted.tsx'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/sites/:sitesId/widget",
    element: <Widget/>
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/login-completed',
    element: <LoginCompleted/>
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}/>
      </QueryClientProvider>      
    </Provider>
  </React.StrictMode>,
)
