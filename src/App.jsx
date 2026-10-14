import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';
import Cursor from './components/Cursor.jsx';
import Home from './pages/Home.jsx';
import RolePage from './pages/RolePage.jsx';
import About from './pages/About.jsx';
import CaseStudy from './pages/CaseStudy.jsx';
import Archive from './pages/Archive.jsx';
import Team from './pages/Team.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Nav />
      <main id="main">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/security" element={<RolePage roleId="security" />} />
            <Route path="/fullstack" element={<RolePage roleId="fullstack" />} />
            <Route path="/ml" element={<RolePage roleId="ml" />} />
            <Route path="/about" element={<About />} />
            <Route path="/work/:slug" element={<CaseStudy />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/team" element={<Team />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      <Cursor />
    </>
  );
}
