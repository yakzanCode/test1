import React from 'react';
import { useLocation } from 'react-router-dom';
import Slider from 'react-slick';

const settings = {
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    arrows: false,
    dots: false,
    pauseOnHover: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: false,
};

const messages = [
    "💥 Get 10% off your first order!",
    "🚚 Free delivery for orders above $50",
    "✨ Check out our newest arrivals!"
];

function Promobar() {

    const location = useLocation();
    const isHome = location.pathname === '/';

    return (
        <div className={`text-center promobar fw-bold text-uppercase py-2 ${isHome ? 'bg-darkred text-light' : 'bg-light text-darkred'}`} style={{ fontSize: '13px' }}>
            <Slider {...settings}>
                {messages.map((msg, idx) => (
                    <div key={idx}>
                        <p className="m-0">{msg}</p>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default Promobar;
