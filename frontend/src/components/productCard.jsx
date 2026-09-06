const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
function ProductCard({ product }) {
    return (
        <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 hover:scale-105">
            <img src={`${BASEURL}${product.image}`} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-4" />
            <h2 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h2>
            <p className="text-gray-600 font-medium">${product.price}</p>
        </div>
    );
}

export default ProductCard;