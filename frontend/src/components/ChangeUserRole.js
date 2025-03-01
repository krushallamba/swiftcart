import React, { useState } from 'react'
import ROLE from '../common/role'
import { IoMdClose } from "react-icons/io";
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const ChangeUserRole = ({name, email, role, userId, onClose, callFunc}) => {

    const [userRole, setUserRole] = useState(role)

    const handleOnChangeSelect = (e)=>{
        setUserRole(e.target.value);
    }

    const updateUserRole = async ()=>{
        const fetchresponse = await fetch(SummaryApi.updateUser.url,{
            method: SummaryApi.updateUser.method,
            credentials: 'include',
            headers:{
                "content-type" : "application/json"
            },
            body: JSON.stringify({
                userId: userId,
                role: userRole
            })
        })

        const responseData = await fetchresponse.json()
        if(responseData.success){
            toast.success(responseData.message)
            onClose()
            callFunc()
        }


    }


  return (
    <div className='absolute top-0 bottom-0 left-0 w-full h-full z-10  flex justify-center items-center bg-slate-200 bg-opacity-50'>
      <div className='bg-white shadow-md p-4 w-full max-w-sm'>

        <button className='block ml-auto' onClick={onClose}>
            <IoMdClose/>
        </button>
        <h1 className='pb-4 text-lg font-medium'>Change User Role</h1>
        <p>Name: {name}</p>
        <p>Email: {email} </p>
        <div className='flex justify-between items-center my-4'>
            <p>Role: </p>
            <select className='border px-4 py-1 ' value={userRole} onChange={handleOnChangeSelect}>
                {
                    Object.values(ROLE).map(el =>{
                        return (
                            <option value={el} key={el}>{el}</option>
                        )
                    })
                }
                
            </select>
        </div>

        <button className='w-fit mx-auto block border py-1 px-3 rounded-full bg-blue-600 text-white hover:bg-blue-800' onClick={updateUserRole}>
            Change Role
        </button>
      </div>
    </div>
  )
}

export default ChangeUserRole
