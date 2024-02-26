import React, { useRef,useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './component/App';
import SignUp from './component/SignUp';
import SignIn from './component/SignIn';
import Menu from './component/menu';



function RouerApp() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<App/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/menus" element={<Menu/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default RouerApp;
