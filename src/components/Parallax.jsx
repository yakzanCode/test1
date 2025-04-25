import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

const App = () => {
  // State to track scroll position
  const [scrollY, setScrollY] = useState(0);

  // Create scroll-based animation using react-spring
  const props = useSpring({
    transform: `translateY(${Math.min(scrollY * 0.5, 400)}px)`, // Limit the movement to 400px
    config: { tension: 120, friction: 14 },
  });

  // Handle scroll event to update scrollY state
  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero" style={{ height: '100vh', background: '#000' }}>
        <h1 style={{ color: 'white', textAlign: 'center', paddingTop: '40vh' }}>
          Welcome to the Hero Section
        </h1>
      </section>

      {/* Parallax Image */}
      <animated.div
        style={{
          ...props,
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <img
          src="https://static.nike.com/a/images/t_default/b7d9211c-26e7-431a-ac24-b0540fb3c00f/AIR+FORCE+1+%2707.png"
          alt="Nike Shoe"
          style={{ width: '300px', height: 'auto' }}
        />
      </animated.div>

      {/* New Collection Section */}
      <section className="newcollection" style={{ height: '100vh', backgroundColor: '#4A90E2' }}>
        <div style={{ textAlign: 'center', paddingTop: '50px' }}>
          <h2 style={{ color: 'white' }}>New Collection</h2>
          <p style={{ color: 'white' }}>Check out the latest Nike collection!</p>
        </div>
      </section>
    </div>
  );
};

export default App;
