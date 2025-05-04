import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import Promobar from './Promobar';
import Navbar from './Navbar';
import WhyChooseUs from './WhyChooseUs';
import Footer from './Footer';

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const hideBackButton = location.pathname === '/';

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
      <Outlet />
      <WhyChooseUs />
      <Footer />
    </div>
  );
};

export default Layout;
