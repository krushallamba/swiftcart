import React, { useState } from 'react'
import { RiEditFill } from "react-icons/ri";
import AdminEditProduct from './AdminEditProduct';
import displayINRCurrency from '../helpers/displayCurrency';

const AdminProductCart = ({data,fetchdata}) => {

    const [editProduct, setEditProduct] = useState(false);

  return (
    <div className='bg-white p-4 rounded'>
        <div className='w-40 '>
            <div className='w-32 h-32 flex justify-center items-center'>
                <img src={data?.productImage[0]} alt={data?.category} className='mx-auto object-scale-down h-full' ></img>
            </div>
            <h1 className='text-ellipsis line-clamp-2'>{data.productName}</h1>
            <div>
                <p className='font-semibold'>
                    {displayINRCurrency(data?.sellingPrice)}
                </p>
                <div className='w-fit ml-auto p-2 rounded-full cursor-pointer hover:bg-blue-600 hover:text-white transition-all' onClick={()=>setEditProduct(true)}>
                    <RiEditFill/>
                </div>
            </div>
        </div>
        {
            editProduct && (
                <AdminEditProduct productData={data} onClose={()=>setEditProduct(false)} fetchdata={fetchdata} />
            )
        }
        
    </div>
  )
}

export default AdminProductCart
