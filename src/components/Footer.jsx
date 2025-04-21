import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-darkred d-flex align-items-center">
      <div className="container-fluid text-white">
        <div className="row py-4 gy-3 mt-1">
          <div className="col-md-3 col-6 col-sm-12 text-center mb-sm-4">
            <h5>Follow Us On Social Media</h5>
            <div className="fs-3">
              <Link className="text-white" to="https://wa.me/4915753368747"><i className="bi bi-whatsapp"></i></Link>
              <Link className="text-white mx-2" to="/"><i className="bi bi-facebook"></i></Link>
              <Link className="text-white" to="/"><i className="bi bi-instagram"></i></Link>
            </div>
          </div>
          <div className="col-md-3 col-6 col-sm-4">
            <h4>Contact</h4>
            <ul className="list-unstyled fw-semibold">
              <li>
                <a href="tel:+4915753368747" className="text-black text-decoration-none">
                  <i className="bi bi-telephone text-white"></i> +49 1575 3368747
                </a>
              </li>
              <li className="my-2">
                <a href="" className="text-black text-decoration-none">
                  <i className="bi bi-shop text-white"></i> Based in Beirut
                </a>
              </li>
              <li>
                <span className="text-black">
                  <i className="bi bi-clock text-white"></i> Available 24/7
                </span>
              </li>
            </ul>
          </div>
          <div className="col-md-3 col-6 col-sm-4">
            <h4>Quick Links</h4>
            <ul className="list-unstyled fw-semibold">
              <li><Link to="/" className="text-black">Home</Link></li>
              <li><Link to="/products" className="text-black">Products</Link></li>
              <li><Link to="#explore-section" className="text-black">Highlights</Link></li>
              <li><Link to="#about-us" className="text-black">About Us</Link></li>
            </ul>
          </div>
          <div className="col-md-3 col-6 col-sm-4">
            <h4>Contact</h4>
            <ul className="list-unstyled fw-semibold">
              <li>
                <a href="tel:+4915753368747" className="text-black text-decoration-none">
                  <i className="bi bi-telephone text-white"></i> +49 1575 3368747
                </a>
              </li>
              <li className="my-2">
                <a href="" className="text-black text-decoration-none">
                  <i className="bi bi-shop text-white"></i> Based in Beirut
                </a>
              </li>
              <li>
                <span className="text-black">
                  <i className="bi bi-clock text-white"></i> Available 24/7
                </span>
              </li>
            </ul>
          </div>
        </div>
        <hr />
        <div className="row py-4 pb-md-0">
          <div className="col text-center">
            <p>&copy; 2025 Coffee Shop. All Rights Reserved. | <Link to="/" className="text-light">Ahmad Yakzan</Link>
            </p>
          </div>
        </div>
      </div>
      <a
        href="https://wa.me/4915225763232"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="Chat on WhatsApp"
      >
        <i className="bi bi-whatsapp"></i>
      </a>
    </footer>
  );
}

export default Footer;
