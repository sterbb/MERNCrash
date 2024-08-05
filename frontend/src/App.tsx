import React from 'react'
import HomeScreen from './screens/HomeScreen'
import { Route, createBrowserRouter,createRoutesFromElements, RouterProvider} from "react-router-dom";
import MainLayout from './layout/MainLayout';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';



const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>

        <Route index element={<HomeScreen />} />
        <Route path="/login" element={<LoginScreen/>} />
        <Route path="/register" element={<RegisterScreen/>} />
      </Route>
    )
  )

  
  return <RouterProvider router = {router}/>
}

export default App