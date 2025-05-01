import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Footer from './components/Footer';
import ProductsList from './components/ProductsList';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import Navbar from './components/Navbar';
import Layout from './components/Layout';
import Promobar from './components/Promobar';
import Category from './components/Category';

function App() {
  return (
    <div>
      <Router>
        <Promobar />
        <Navbar />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/products" element={<ProductsList />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/category/:cat" element={<Category />} />
            <Route path="/cart" element={<Cart />} />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
