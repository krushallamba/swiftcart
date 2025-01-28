import React, { useEffect, useState } from 'react'
import SummaryApi from '../common';
import { Link } from 'react-router-dom';

const CategoryList = () => {

    const [categoryProduct, setCategoryProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const categoryLoading = new Array(12).fill(null)

    const fetchCategoryProduct = async ()=>{
        setLoading(true)
        const response = await fetch(SummaryApi.categoryProduct.url,{
            method: SummaryApi.categoryProduct.method
        })
        const dataResponse = await response.json()
        setLoading(false)
        setCategoryProduct(dataResponse.data)
    }

    useEffect(()=>{
        fetchCategoryProduct()
    }, [])
  return (
    <div className='container mx-auto p-4 md:px-16 md:py-4'>
      <div className='flex items-center gap-4 justify-between overflow-scroll scrollbar-none'>
        {
            loading ? (
                    categoryLoading.map((el,index)=>{
                        return (
                            <div className='h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-white animate-pulse'>
                            </div>
                        )
                    })
                
            ) : 
            (
                categoryProduct.map((product,index)=>{
                return(
                    <Link to={"/product-category?category=" + product?.category} key={product?.category} className='cursor-pointer'>
                        <div className='w-16 h-16 md:h-20 md:w-20 rounded-full overflow-hidden p-4 bg-white flex items-center justify-center '>
                            <img src={product?.productImage[0]} alt={product.category} className='h-full object-scale-down hover:scale-110 transition-all' />
                        </div>
                        <p className='text-center text-sm md:text-base capitalize'>{product?.category}</p>
                    </Link>
                    )
                })
            )
        }
      </div>
    </div>
  )
}

export default CategoryList
