import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Createpost from './pages/Createpost';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Singlepost from './pages/Singlepost';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
      </div >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<Singlepost />} />
        <Route path="/createpost" element={<Createpost />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <div>
        <Footer />
      </div>
    </BrowserRouter>

  );
}

export default App;
