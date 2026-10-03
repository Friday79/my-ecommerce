import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

function Navbar() {
    const { cartItems } = useCart();

    const cartCount = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );

    return (
        <nav className="bg-gray-800 shadow-md text-white p-4 flex justify-between items-center">
            <div>
                <Link
                    to="/"
                    className="text-white font-bold hover:text-gray-300"
                >
                    My E-commerce
                </Link>
            </div>

                    <Link to="/cart" className="relative text-gray-800 hover:text-gray-300 font-medium">
                        🛒 Cart {cartCount > 0 && (
                            <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </Link>
        </nav>
    );
};

export default Navbar;