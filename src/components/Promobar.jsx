import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Promobar() {

    const location = useLocation();
    const isHome = location.pathname === '/';
    
    return (
        <div className={`carousel slide text-center bg-darkred promobar ${isHome ? 'bg-darkred text-light' : 'bg-light text-darkred'}`} data-bs-ride="carousel">
            <div className="carousel-inner fw-bold py-2 text-uppercase" style={{ fontSize: '13px' }}>
                <div className="carousel-item active">
                    💥 Get 10% off your first order!
                </div>
                <div className="carousel-item">
                    🚚 free delivery for orders above $50
                </div>
                <div className="carousel-item">
                    ✨ Check out our newest arrivals!
                </div>
            </div>
        </div>
    );
}

export default Promobar;
