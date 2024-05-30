import { useEffect, useRef, useState } from 'react'
import Navbar from './components/Navbar'
import Management from './Pages/Management'
import Register from './Pages/Register'
import Simulacao from './Pages/Simulacao'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout'
import CaminhaoSpecific from './Pages/CaminhaoSpecific'


function App() {

  const Router = createBrowserRouter([
  {
    path: '/register',
    element: <Layout><Register /></Layout>
  },
  {
    path: '/combinacoes',    
    element: <Layout><Simulacao /></Layout>
  },
  {
    path: "/gerenciamento",
    element: <Layout><Management /></Layout>
  },
  {
    path: "/caminhao",
    element: <Layout><CaminhaoSpecific /></Layout>
  }
  ])
  
  return (
    <RouterProvider router={Router}>
      
    </RouterProvider>
  )
}

export default App
