import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ProductsList from './components/ProductsList';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import Layout from './components/Layout';
import Category from './components/Category';
import NotFound from './components/NotFound';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/products" element={<ProductsList />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/category/:cat" element={<Category />} />
            <Route path="/cart" element={<Cart />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
