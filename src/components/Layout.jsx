import { useNavigate, Outlet, useLocation } from 'react-router-dom';

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // You can customize which routes shouldn't show the Back button
  const hideBackButton = location.pathname === '/';

  return (
    <div className="app-layout">
      {!hideBackButton && (
        <div className="p-2 mt-2 ms-2 fw-semibold"
          onClick={() => navigate(-1)}
          style={{ fontSize: '12px', cursor: 'pointer' }}>
          <i className='bi bi-caret-left'></i> back
        </div>
      )}
      <Outlet />
    </div>
  );
};

export default Layout;
