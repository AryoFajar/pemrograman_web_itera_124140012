import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import NotFound from './pages/NotFound/NotFound';
import Latihan from './pages/Latihan/Latihan';
import './App.css';

function App() {
  return (
    <Router>
      <TaskProvider>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/latihan" element={<Latihan />} />
            {/* Rute fallback 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </TaskProvider>
    </Router>
  );
}

export default App;
