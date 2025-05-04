import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Promobar from './Promobar';
import Navbar from './Navbar';
import WhyChooseUs from './WhyChooseUs';
import Footer from './Footer';

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showTopButton, setShowTopButton] = useState(false);

  const hideBackButton = location.pathname === '/';

  // Show the “back to top” button after scrolling
  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app-layout">
      <Promobar />
      <Navbar />
      {!hideBackButton && (
        <div className="p-2 mt-2 ms-2 fw-semibold"
          onClick={() => navigate(-1)}
          style={{ fontSize: '12px', cursor: 'pointer' }}>
          <i className='bi bi-caret-left'>back</i>
        </div>
      )}

      <a
        href="https://wa.me/4915753368747"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="Chat on WhatsApp"
      >
        <i className="bi bi-whatsapp"></i>
      </a>

      {showTopButton && (
        <i
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
          className="bi bi-arrow-up-square-fill bg-dark scroll-top-btn"
        >
        </i>
      )}
      <Outlet />
      <WhyChooseUs />
      <Footer />
    </div>
  );
};

export default Layout;
