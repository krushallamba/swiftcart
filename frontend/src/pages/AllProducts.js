import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import SummaryApi from '../common';
import AdminProductCart from '../components/AdminProductCart';

const AllProducts = () => {

  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  const fetchAllProduct = async ()=>{
    const response = await fetch(SummaryApi.allProduct.url,{
      method: 'GET',
    })
    const dataResponse = await response.json();
    setAllProduct(dataResponse?.data || []);
  }

  useEffect(()=>{
    fetchAllProduct();
  },[])

  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-semibold text-lg'>Products</h2>
        <button className='border-2 border-blue-600 hover:bg-blue-600 hover:text-white transition-all py-2 px-4 rounded-full' onClick={()=>setOpenUploadProduct(true)}>Upload Product</button>
      </div>

      <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll '>
        {
          allProduct.map((product, index)=>{
            return(
              <AdminProductCart data={product} key={index+"allProduct"} fetchdata={fetchAllProduct}/>
              
            )
          })
        }
      </div>

      {
        openUploadProduct && <UploadProduct onClose={()=>setOpenUploadProduct(false)} fetchData={fetchAllProduct} />
      }
    </div>
  )
}

export default AllProducts
