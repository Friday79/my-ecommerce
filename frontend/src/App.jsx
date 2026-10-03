import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./pages/productList";
import ProductDetail from "./pages/productDetails";
import Navbar from "./components/Navbar";
import CartPage from './pages/CartPage';
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router>
  );
}

export default App;