import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <aside>
      <div className="offcanvas offcanvas-start" style={{ width: '300px' }} tabindex="-1" id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel">
        <i className="bi bi-x-lg fw-bolder fs-3 btn ms-auto mt-2 me-1" data-bs-dismiss="offcanvas" aria-label="Close"></i>
        <div className="offcanvas-header">
          <h1 className="offcanvas-title fw-bolder" id="offcanvasExampleLabel">
            AHMAD'S STORE
          </h1>
        </div>
        <div className="offcanvas-body">
          <ul className="p-0 g-0 row offcanvas-list" data-bs-dismiss="offcanvas">
            <li className="border-0"><a className="nav-link fs-4 fw-bold active"><Link to="/">Home</Link></a></li>
            <li className="border-0"><a className="nav-link fs-4 fw-bold"><Link to="/products">Products</Link></a></li>
            <li className="border-0"><a className="nav-link fs-4 fw-bold">Highlights</a></li>
            <li className="border-0"><a className="nav-link fs-4 fw-bold"><Link to="/cart">Cart</Link></a></li>
          </ul>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;

