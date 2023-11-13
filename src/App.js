import './App.css';
import {  Routes, Route } from 'react-router-dom';
// import axios from 'axios';

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
        <Route path = "/:userId/:postTitle" element={<Post/>}/>
        <Route path = "/:userId" element={<Profile/>}/>
        <Route path = "/search" element={<Search/>}/>
        <Route path = "/register" element={<SignUp/>}/>
      </Routes>
    </div>
  );
}

export default App;
