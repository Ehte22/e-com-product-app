import React from 'react';
import ProductCard from './ProductCard';
import { useGetProductQuery } from "admin/redux/product.api"
import Loader from './Loader';

const ProductListing = () => {
    const { data, isLoading } = useGetProductQuery()

    if (isLoading) {
        return <Loader />
    }
    return (
        <div className="container mx-auto p-4 mt-10  md:px-12 lg:px-20">
            {/* Grid layout with responsive columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {data?.result.map((product: any) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductListing;
