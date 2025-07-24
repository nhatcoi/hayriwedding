import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './utils/i18n';
import './App.css';

// Components
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import MouseFollower from './components/MouseFollower';
import FloatingContactButton from './components/FloatingContactButton';

// Pages
import Home from './pages/Home';
import Services from './pages/Services';
import Gallery from './pages/Gallery';
import Testimonials from './pages/Testimonials';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <div className="App">
        <MouseFollower />
        <Navigation />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        
        <Footer />
        <FloatingContactButton />
      </div>
    </Router>
  );
}

export default App;
