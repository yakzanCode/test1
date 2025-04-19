import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import ProductsList from './components/ProductsList';
import ProductDetails from './components/ProductDetails'; 
import Cart from './components/Cart';
import Navbar from './components/Navbar';

function App() {
  return (
    <div>
    <Router> {/* Wrap everything inside Router */}
      <Navbar />
      {/* <Sidebar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsList />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
    </Router>
    </div>
  );
}

export default App;
