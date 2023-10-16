import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signin from './Component/Signin';
import Signup from './Component/Signup';
import Navbar from './Component/Navbar';
import Home from './Component/Home';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { UserContextProvider } from './Context/userContext';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8000';

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Navbar />
        <Toaster position="top-right" toastOptions={{ duration: 2000 }} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
