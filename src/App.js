import './App.css';

import React from 'react';
import {  Routes, Route } from 'react-router-dom';

import Main from './pages/Main.js';
import Post from './pages/Post.js';
import Profile from './pages/Profile.js';
import Search from './pages/Search.js';
import SignUp from './pages/SignUp.js';
import Write from './pages/Write.js';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path = "/" element={<Main/>}/>
        <Route path = "/write" element={<Write/>}/>
        <Route path = "/:boardId" element={<Post/>}/>
        <Route path = "/profile/:userId" element={<Profile/>}/>
        <Route path = "/search" element={<Search/>}/>
        <Route path = "/register/:email" element={<SignUp/>}/>
      </Routes>
    </div>
  );
}

export default App;
