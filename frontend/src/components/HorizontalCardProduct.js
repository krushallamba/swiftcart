import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import displayINRCurrency from '../helpers/displayCurrency';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';
import Context from '../context';

const HorizontalCardProduct = ({category, heading}) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const loadingList = new Array(13).fill(null);
    const [scroll, setScroll] = useState(0);
    const scrollElement = useRef()

    const { fetchUserAddToCart } = useContext(Context)

    const handleAddToCart = async (e,id)=>{
       await addToCart(e,id)
       fetchUserAddToCart()
    }

    const fetchData = async ()=>{
        setLoading(true);
        const categoryProduct = await fetchCategoryWiseProduct(category);
        setLoading(false);
        setData(categoryProduct?.data)
    }

    useEffect(()=>{
        fetchData()
    },[])

    const scrollRight = ()=>{
        scrollElement.current.scrollLeft += 300
    }
    const scrollLeft = ()=>{
        scrollElement.current.scrollLeft -= 300
    }

  return (
    <div className='container mx-auto md:px-16 px-4 my-6 relative'>
        <h2 className='text-2xl font-semibold py-4' >{heading}</h2>
        <div className='flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all ' ref={scrollElement}>
        <button className='text-black p-1 bg-white rounded-full absolute left-12 text-lg hidden md:block ' onClick={scrollLeft} ><FaAngleLeft/></button>
        <button className='text-black p-1 bg-white rounded-full absolute right-12 text-lg hidden md:block' onClick={scrollRight} ><FaAngleRight/></button>

        {
            loading ? (

                loadingList.map((product,index)=>{
                    return (
                        <div className='w-full min-w-[280px] max-w-[280px] md:min-w-[320px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex'>
                            <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] flex items-center justify-center animate-pulse'>
                                
                            </div>
                            <div className='p-4 grid w-full gap-2 '>
                                <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 bg-slate-200 animate-pulse rounded-full'></h2>
                                <p className='capitalize text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full'></p>
                                <div className='flex gap-3 text-ellipsis line-clamp-1 w-full'>
                                    <p className='font-medium text-blue-600 p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                                    <p className='text-slate-600 line-through p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                                </div>
                                <button className='text-sm text-white px-3 py-1 rounded-full w-full bg-slate-200 p-1'></button>
                            </div>
                        </div>
                    )
                })
            ) : (
                    data.map((product,index)=>{
                        return (
                            <Link to={"product/" + product?._id} className='w-full min-w-[280px] max-w-[280px] md:min-w-[320px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex'>
                                <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] flex items-center justify-center'>
                                    <img src={product.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all' />
                                </div>
                                <div className='p-4 grid'>
                                    <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                                    <p className='capitalize text-slate-500'>{product?.category}</p>
                                    <div className='flex gap-3 text-ellipsis line-clamp-1'>
                                        <p className='font-medium text-blue-600'>{displayINRCurrency(product?.sellingPrice)}</p>
                                        <p className='text-slate-600 line-through'>{displayINRCurrency(product?.price)}</p>
                                    </div>
                                    <button className='text-sm bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded-full' onClick={(e)=>handleAddToCart(e, product?._id)}>Add to Cart</button>
                                </div>
                            </Link>
                        )
                    })
            )
        }
        </div>
      
    </div>
  )
}

export default HorizontalCardProduct
