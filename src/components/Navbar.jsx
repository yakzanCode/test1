import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getCategories } from '../services/api';

function Navbar() {
    const location = useLocation();
    const isHome = location.pathname === '/';
    const [scrolled, setScrolled] = useState(false);
    const [categories, setCategories] = useState([]);

    const handleScroll = () => {
        // const promoBar = document.querySelector('.promobar');
        // const promoHeight = promoBar ? promoBar.offsetHeight : 30;
        if (window.scrollY > 30) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        getCategories()
          .then(setCategories)
          .catch(err => console.error('Failed to fetch categories:', err));
      }, []);

    return (

        <>
            <nav className={`navbar navbar-expand-md nav-underline ${isHome
                ? scrolled
                    ? 'fixed-top'
                    : 'fixed-top mt-4 bg-transparent'
                : 'sticky-top'
                }`}>
                <div className="container-fluid">
                    <a className="d-md-none border-0" type="button" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button"
                        aria-controls="offcanvasExample">
                        <i className="bi bi-filter-left fs-2 text-white"></i>
                    </a>
                    <span className='mx-md-4 mx-auto mx-md-1'>
                        <Link to="/" className='navbar-brand fw-semibold text-white'>
                            {/* <img src="src/assets/logo.png" alt="Shop Logo" width="35" loading="lazy" /> */}
                            Ahmad's Shop
                        </Link>
                    </span>
                    <div className="text-uppercase collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav justify-content-center p-3 fw-bold fs-6 w-100 gap-5">
                            <li className="nav-item">
                                <span className="nav-link text-white"><Link to="/" className='text-white text-decoration-none'>Home</Link></span>
                            </li>
                            <li className="nav-item">
                                <span className="nav-link text-white" role="button"><Link to="/products" className='text-white text-decoration-none'>Products</Link></span>
                            </li>
                            <li className="nav-item">
                                <span className="nav-link text-white" role="button"><Link to="/products" className='text-white text-decoration-none'>Categories</Link></span>
                            </li>
                            <li className="nav-item">
                                <span className="nav-link text-white"><Link to="/featured" className='text-white text-decoration-none'>Featured</Link></span>
                            </li>
                        </ul>
                    </div>
                    <span>
                        <Link to="/cart" className='text-white text-decoration-none'><i className="bi bi-bag-fill fs-5"></i></Link>
                    </span>
                </div>
            </nav>

            <div className="offcanvas offcanvas-start" style={{ width: '300px' }} tabIndex="-1" id="offcanvasExample"
                aria-labelledby="offcanvasExampleLabel">
                <i className="bi bi-x-lg btn position-absolute top-0 end-0" data-bs-dismiss="offcanvas" aria-label="Close"></i>
                <div className="offcanvas-header px-1 mt-4">
                    <h1 className="offcanvas-title fw-bolder text-darkred" id="offcanvasExampleLabel">
                        AHMAD'S STORE
                    </h1>
                </div>
                <div className="offcanvas-body d-flex flex-column">
                    <ul className="p-0 g-0 mb-0 row offcanvas-list list-unstyled" data-bs-dismiss="offcanvas">
                        <li className="border-0 d-flex"><Link className='text-decoration-none text-darkred' to="/"><span className="nav-link fs-6 fw-bold">HOME</span></Link></li>
                        <li className="border-0 d-flex my-3"><Link className='text-decoration-none text-darkred' to="/products"><span className="nav-link fs-6 fw-bold">ALL PRODUCTS</span></Link></li>
                        <li className="border-0 d-flex"><Link className='text-decoration-none text-darkred' to="/products"><span className="nav-link fs-6 fw-bold">HIGHLIGHTS</span></Link></li>
                    </ul>

                    <p className="border-0 d-flex text-darkred mb-2 mt-3" href="#collapseExample" role='button' data-bs-toggle="collapse"><span className='text-decoration-none fs-6 fw-bold'>CATEGORIES</span><i className='bi bi-plus-lg ms-auto'></i></p>
                    <div className="collapse list-unstyled w-100 ps-3" id="collapseExample">
                        {categories.map((cat, index) => (
                            <li key={index}>
                                <Link
                                    className='text-darkred fw-semibold text-decoration-none'
                                    to={`/category/${cat.name}`}
                                >
                                    {cat.name}
                                </Link>
                            </li>
                        ))}
                    </div>

                    <span className="mt-auto"><Link to="/cart"><span className="nav-link fs-4 fw-bold text-darkred"><i className='bi bi-cart2 text-darkred'></i></span></Link></span>
                </div>
            </div>
        </>
    );
}

export default Navbar;
