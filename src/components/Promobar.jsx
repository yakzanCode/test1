import React from 'react';

function Promobar() {

    return (
        <div className="carousel slide text-center" data-bs-ride="carousel">
            <div className="carousel-inner fw-bold text-darkred py-1 text-uppercase" style={{ fontSize: '12px' }}>
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
