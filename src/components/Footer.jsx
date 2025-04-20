import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-pink d-flex align-items-center" style={{minHeight: '70vh'}}>
      <div className="container text-white text-center">
        <div className="row py-4 gy-3">
          <div className="col-md-4 d-flex flex-column justify-content-center">
            <img loading="lazy" className="mx-auto" style={{width: '60px'}} src="src/assets/logo.png" alt="Shop Logo"/>
            <div className="fs-3">
              <Link className="text-white" to="https://wa.me/4915753368747"><i className="bi bi-whatsapp"></i></Link>
              <Link className="text-white mx-2" to="/"><i className="bi bi-facebook"></i></Link>
              <Link className="text-white" to="/"><i className="bi bi-instagram"></i></Link>
            </div>
          </div>
          <div className="col-md-4 d-flex flex-column justify-content-center">
            <h4>Contact</h4>
            <ul className="list-unstyled fw-semibold">
              <li><a href="tel:+4915753368747" className="text-dark text-decoration-none"><i
                className="bi bi-telephone"></i> +49 1575 3368747</a></li>
              <li className="my-2"><a href="" className="text-dark text-decoration-none"><i className="bi bi-shop"></i>
                Beirut Street, Beirut</a></li>
              <li><span className="text-dark"><i className="bi bi-clock"></i> Mon-Sun 09:00-12:00 </span></li>
            </ul>
          </div>
          <div className="col-md-4 d-flex flex-column justify-content-center">
            <h4>Direct Links</h4>
            <ul className="list-unstyled fw-semibold">
              <li><Link to="/" className="text-dark">Home</Link></li>
              <li><Link to="/products" className="text-dark">Products</Link></li>
              <li><Link to="#explore-section" className="text-dark">Highlights</Link></li>
              <li><Link to="#about-us" className="text-dark">About Us</Link></li>
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
