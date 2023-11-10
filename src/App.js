import './App.css';
import {  Routes, Route } from 'react-router-dom';
// import axios from 'axios';

import Main from './pages/Main.js';
import Post from './pages/Post.js';
import Profile from './pages/Profile.js';
import Search from './pages/Search.js';
import SignUp from './pages/SignUp.js';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path = "/" element={<Main/>}/>
        <Route path = "/post" element={<Post/>}/>
        <Route path = "/profile" element={<Profile/>}/>
        <Route path = "/search" element={<Search/>}/>
        <Route path = "/register" element={<SignUp/>}/>
      </Routes>
    </div>
  );
}

export default App;
