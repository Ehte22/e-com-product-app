import React from 'react';
import { IProduct } from '../models/product.interface';
import { useNavigate } from 'react-router-dom';

interface IProductCardProps {
    product: IProduct
}

const ProductCard: React.FC<IProductCardProps> = ({ product }) => {
    const navigate = useNavigate()
    return (
        <div className="w-full p-4">
            <div className="bg-white shadow-md rounded-md overflow-hidden hover:shadow-lg transition duration-300">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-56 object-cover object-center"
                />
                <div className="p-4">
                    <div className='flex justify-between'>
                        <h3 className="text-xl font-semibold text-teal-600">{product.name}</h3>
                        <p className="text-lg text-teal-500 mb-4">${product.price}</p>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{product.desc}</p>
                    <div className='text-end'>
                        <button
                            onClick={() => navigate(`/product/details/${product._id}`)}
                            className="inline-block bg-teal-600 text-white py-2 px-4 rounded-sm hover:bg-teal-700 transition duration-200"
                        >
                            View Product
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
