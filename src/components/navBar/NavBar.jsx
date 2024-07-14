import React, { useEffect, useState } from 'react'
import Navigation from '../../app/router/Navigation';
import { GetProductsStore, resultFilter } from '../../state-store/store';

export default function NavBar() {
    const [showModal, setShowModal] = useState(false);
    const [valueSelect1, setValueSelect1] = useState('');
    const [valueInput1, setValueInput1] = useState('');
    const [valueInput2, setValueInput2] = useState('');
    const {products, loading, getProducts} = GetProductsStore((state) => ({
        products: state.products,
        loading: state.loading,
        getProducts: state.getProducts
    }));
    const { getResultFilter, stateFilter } = resultFilter((state) => ({
        getResultFilter: state.getResultFilter,
        stateFilter: state.stateFilter
    }))

    useEffect(() => {
        getProducts();
    }, [getProducts]);

    console.log(valueSelect1);
    const uniqueTypes = [...new Set(products.map(product => product.type))];

    function sendResultFilter() {
        const maxPrice = parseFloat(valueInput2);
        const minPrice = parseFloat(valueInput1);

        if (valueSelect1 == 'null') {
            getResultFilter(products)
            console.log(products);
        }
        else {
            const res = products.filter(el => {
                const typeCondition = valueSelect1 ? el.type === valueSelect1 : true;
                const minPriceCondition = !isNaN(minPrice) ? el.price >= minPrice : true;
                const maxPriceCondition = !isNaN(maxPrice) ? el.price <= maxPrice : true;
                return typeCondition && minPriceCondition && maxPriceCondition;
            });
            getResultFilter(res)
        }
    }

    return(
    <>
        <header className='bg-gray-100 rounded-b-md p-4 flex justify-end' style={{ width: '100%', minHeight: '80px'}}>
            <button id='buttonBack' className='px-5 hover:bg-gray-700 hover:text-white rounded-md border-2 transition duration-200 ease-in-out' onClick={() => document.location.href = '/'} >назад</button>
            <button id='buttonFilter' className='px-5 hover:bg-gray-700 hover:text-white rounded-md border-2 transition duration-200 ease-in-out' onClick={() => setShowModal(!showModal)} >Филтеры</button>
        </header>
        {showModal && (
            <div className='w-full mt-3 mb-3 p-4 rounded-md bg-gray-100 min-h-44 '>
                <label htmlFor="">тип </label>
                <select value={valueSelect1 ?? ''} onChange={(el) => setValueSelect1(el.target.value)}>
                    <option value="null">все типы</option>
                    {loading ? <h1>Loading...</h1> : 
                    uniqueTypes.map((el, index) => (
                        <option key={index} value={el}>{el}</option>
                    ))}
                </select>
                <div className='mt-4'>
                    <label htmlFor="">Цина</label>
                    <div className='flex gap-4'>
                        <div><input onChange={(e) => setValueInput1(e.target.value)} value={valueInput1 ?? ''} className=' max-w-16  outline-none' type="number"  placeholder='от'/><span> $</span></div>
                        <div><input onChange={(e) => setValueInput2(e.target.value)} value={valueInput2 ?? ''} className=' max-w-16  outline-none' type="number"  placeholder='до'/><span> $</span></div>
                    </div>
                </div>
                <button onClick={() => sendResultFilter()} className='px-5 hover:bg-gray-700 hover:text-white rounded-md mt-10 border-2 transition duration-200 ease-in-out'>Филтер</button>
            </div>
       
    )}
    <Navigation />
    </>)
}
