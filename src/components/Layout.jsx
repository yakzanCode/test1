import { useNavigate, Outlet, useLocation } from 'react-router-dom';

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // You can customize which routes shouldn't show the Back button
  const hideBackButton = location.pathname === '/';

  return (
    <div className="app-layout">
      {!hideBackButton && (
        <button onClick={() => navigate(-1)} className="btn btn-light mt-2 ms-2">
          ← Back
        </button>
      )}
      <Outlet />
    </div>
  );
};

export default Layout;
