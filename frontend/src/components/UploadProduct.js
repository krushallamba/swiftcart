import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import productCategory from "../helpers/productCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import uploadImage from "../helpers/uploadImage";
import DisplayImage from "./DisplayImage";
import SummaryApi from "../common";
import {toast} from 'react-toastify'

const UploadProduct = ({ onClose, fetchData }) => {

  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });

  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);

  const [fullScreenImage, setFullScreenImage] = useState("");

  const handleOnChange = (e) => {
    const {name, value} = e.target

    setData((prev)=>{
        return{
            ...prev,
            [name]: value
        }
    })
  };

  const handleUploadProduct = async (e)=>{
    const file = e.target.files[0]
    const uploadImageCloudinary = await uploadImage(file)

    setData((prev)=>{
        return{
            ...prev,
            productImage: [...prev.productImage, uploadImageCloudinary.url]
        }
    })
  }

  const handleDeleteProductImage = async(index)=>{
    const newProductImage = [...data.productImage]
    newProductImage.splice(index, 1)

    setData((prev)=>{
        return{
            ...prev,
            productImage: [...newProductImage]
        }
    })
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()

    const response = await fetch(SummaryApi.uploadProduct.url,{
      method: SummaryApi.uploadProduct.method,
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data)
    })

    const responseData = await response.json()

    if(responseData.success){
      toast.success(responseData?.message)
      onClose()
      fetchData()
    }
    if(responseData.error){
      toast.error(responseData?.message)
    }
  }

  return (
    <div className="fixed bg-slate-200 bg-opacity-50 w-full h-full top-0 left-0 right-0 bottom-0 flex justify-center items-center ">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-lg">Upload Product</h2>
          <div
            className="w-fit ml-auto text-2xl cursor-pointer"
            onClick={onClose}
          >
            <IoMdClose />
          </div>
        </div>
        <form className="grid p-4 gap-3 overflow-y-scroll h-full pb-5" onSubmit={handleSubmit}>
          <label htmlFor="productName">Product Name:</label>
          <input
            type="text"
            id="productName"
            name="productName"
            placeholder="Enter Product Name"
            value={data.productName}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 outline-none border rounded"
          ></input>

          <label htmlFor="brandName">Brand Name:</label>
          <input
            type="text"
            id="brandName"
            name="brandName"
            placeholder="Enter Brand Name"
            value={data.brandName}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 outline-none border rounded"
            required
          ></input>

          <label htmlFor="category">Category :</label>
          <select required value={data.category} name="category" onChange={handleOnChange} className="p-2 bg-slate-100 outline-none border rounded">
            <option value="" >Select Category</option>
            {
                productCategory.map((el,index)=>{
                    return (
                        <option key={el.value+index} value={el.value}>{el.label}</option>
                    )
                })
            }
          </select>
          <label htmlFor='productImage' className='mt-3'>Product Image :</label>
              <label htmlFor='uploadImageInput'>
              <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
                        <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                          <span className='text-4xl'><FaCloudUploadAlt/></span>
                          <p className='text-sm'>Upload Product Image</p>
                          <input type='file' id='uploadImageInput' className='hidden' onChange={handleUploadProduct}/>
                        </div>
              </div>
              </label> 
              <div>
                  {
                    data?.productImage[0] ? (
                        <div className='flex items-center gap-2'>
                            {
                              data.productImage.map((el,index)=>{
                                return(
                                  <div className='relative group'>
                                      <img 
                                        src={el} 
                                        alt={el} 
                                        width={80} 
                                        height={80}  
                                        className='bg-slate-100 border cursor-pointer'  
                                        onClick={()=>{
                                            setOpenFullScreenImage(true)
                                            setFullScreenImage(el)
                                        }}
                                        />

                                        <div className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer' onClick={()=>handleDeleteProductImage(index)}>
                                          <MdDelete/>  
                                        </div>
                                  </div>
                                  
                                )
                              })
                            }
                        </div>
                    ) : (
                      <p className='text-red-600 text-xs'>*Please upload product image</p>
                    )
                  }
                  
              </div>

              <label htmlFor='price' className='mt-3'>Price :</label>
              <input 
                type='number' 
                id='price' 
                placeholder='Enter Price' 
                value={data.price} 
                name='price'
                onChange={handleOnChange}
                className='p-2 bg-slate-100 border rounded outline-none'
                required
              />

              <label htmlFor='sellingPrice' className='mt-3'>Selling Price :</label>
              <input 
                type='number' 
                id='sellingPrice' 
                placeholder='Enter Selling Price' 
                value={data.sellingPrice} 
                name='sellingPrice'
                onChange={handleOnChange}
                className='p-2 bg-slate-100 border rounded outline-none'
                required
              />

              <label htmlFor='description' className='mt-3'>Description :</label>
              <textarea 
                className='h-28 bg-slate-100 border rounded resize-none p-1 outline-none' 
                placeholder='Enter Product Description' 
                rows={3} 
                onChange={handleOnChange} 
                name='description'
                value={data.description}
              >
              </textarea>
              <button className='px-3 py-2 bg-blue-600 text-white mb-10 hover:bg-blue-700 rounded'>Upload Product</button>


        </form>


      </div>
      {
        openFullScreenImage && (
            <DisplayImage onClose={()=>setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
        )
      }
      
    </div>
  );
};

export default UploadProduct;
