import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "admin/redux/product.api"
import { useAddCartItemMutation } from "cart/redux/cart.api"
import { toast } from "../services/toast";
import Loader from "../components/Loader";


const ProductDetails = () => {
    const x = localStorage.getItem("user") as string
    const user = JSON.parse(x)
    const navigate = useNavigate()
    const { id } = useParams()
    const { data: product, isLoading } = useGetProductByIdQuery(id)
    const [addCartItem, { data: addMessage, isSuccess, isAddCartLoading }] = useAddCartItemMutation()

    const handleAddCartItem = (product: any) => {
        user ? addCartItem({ productId: product._id }) : navigate("/auth")
    }

    useEffect(() => {
        if (isSuccess) {
            toast.showSuccess(addMessage)
        }
    }, [addMessage, isSuccess])

    if (isLoading | isAddCartLoading) {
        return <Loader />
    }

    return (
        <div className="container mx-auto p-4 mt-10 py-8 md:px-12 lg:px-24">
            {product && <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Product Image */}
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-96 object-cover object-center"
                    />
                </div>

                {/* Product Information */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
                    <p className="text-lg text-teal-600 font-semibold mb-4">${product.price}</p>
                    <p className="text-gray-700 leading-relaxed mb-6">{product.desc}</p>

                    {/* Add to Cart Section */}
                    <div className="flex items-center gap-4">
                        <button className="bg-teal-600 text-white py-2 px-6 rounded-sm hover:bg-teal-700 transition duration-200"
                            onClick={() => handleAddCartItem(product)}>
                            Add to Cart
                        </button>
                        <span className="text-sm text-gray-600">In Stock</span>
                    </div>
                </div>
            </div>}

            {/* Additional Product Details */}
            <div className="mt-12">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Product Details</h2>
                <ul className="list-disc pl-6 text-gray-700">
                    <li>High-quality materials</li>
                    <li>Available in various sizes and colors</li>
                    <li>30-day return policy</li>
                    <li>1-year warranty included</li>
                </ul>
            </div>
        </div>
    );
};

export default ProductDetails
