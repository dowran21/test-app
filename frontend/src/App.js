import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { lazy, Suspense } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { LoadUser } from './application/middlewares/auth';
import {  Toaster } from 'react-hot-toast';

const Login = lazy(()=>import("./pages/Login/login.js"))
const MainPage = lazy(()=>import("./pages/MainPage/index.js"))

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(LoadUser());
    // eslint-disable-next-line
  }, []);

  return (
    <BrowserRouter>
      <MantineProvider>
        <div className='w-full px-24 '>
          <Suspense>
            <Routes>
              <Route path = "/" element = {<MainPage/>} />
              <Route path='/login' element = {<Login/>}/>
            </Routes>
          </Suspense>
        </div>
      </MantineProvider>
      <Toaster/>
    </BrowserRouter>
  );
}

export default App;
