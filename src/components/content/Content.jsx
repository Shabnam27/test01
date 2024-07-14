import React, { useEffect, useMemo } from 'react'
import { GetProductsStore } from '../../state-store/store';

export default function Content() {
    const {products, loading, getProducts} = GetProductsStore((state) => ({
        products: state.products,
        loading: state.loading,
        getProducts: state.getProducts
    }));

    useEffect(() => {
        getProducts();
        document.getElementById('buttonFilter').style.display = 'block'
        document.getElementById('buttonBack').style.display = 'none'
    }, []);

    useEffect(() => {
        getProducts();
    }, [getProducts]);

    const item = useMemo(() => {
        const idProduct = localStorage.getItem('idProduct');
        return products.filter((el) => el.id === parseInt(idProduct));
    }, [products]);

    if(loading) {
        return <div className='text-center py-10'>Product not found</div>;
    }
  return (
    <div className='max-w-4xl mx-auto p-4'>
      {item.map((el) => (
        <div key={el.id} className='flex flex-col md:flex-row items-center md:items-start'>
            <img src={el.image} alt={el.title} className='w-full md:w-1/2 rounded-lg shadow-lg'/>
            <div className='md:ml-8 mt-4 md:mt-0'>
                <h1 className='text-3xl font-bold'>{el.title}</h1>
                <h4 className='text-xl text-gray-600'>{el.type}</h4>
                <p className='text-2xl text-gray-800 mt-2 font-medium'>{el.price}</p>
                <p className='text-gray-700 mt-4'>{el.content}</p>
            </div>
        </div>
      ))}
    </div>
  );
}
