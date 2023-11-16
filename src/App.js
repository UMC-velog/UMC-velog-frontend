import './App.css';

import React, { useState } from 'react';
import {  Routes, Route } from 'react-router-dom';

import Main from './pages/Main.js';
import Post from './pages/Post.js';
import Profile from './pages/Profile.js';
import Search from './pages/Search.js';
import SignUp from './pages/SignUp.js';
import Write from './pages/Write.js';

export const LoginStateContext = React.createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const LoginHandler = (setLogin) => {
    if(setLogin !== null){
      setIsLoggedIn(setLogin);
    }
    return isLoggedIn;
  }

  return (
    <LoginStateContext.Provider value={LoginHandler}>
      <div className="App">
        <Routes>
          <Route path = "/" element={<Main/>}/>
          <Route path = "/write" element={<Write/>}/>
          <Route path = "/:userId/:postTitle" element={<Post/>}/>
          <Route path = "/:userId" element={<Profile/>}/>
          <Route path = "/search" element={<Search/>}/>
          <Route path = "/register/:email" element={<SignUp/>}/>
        </Routes>
      </div>
    </LoginStateContext.Provider>
  );
}

export default App;
