import React, { useContext, useState } from 'react'
import Logo from './Logo'
import { IoSearchSharp } from "react-icons/io5";
import { FaRegUser, FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';


const Header = () => {

    const user = useSelector(state => state?.user?.user)
    const dispatch = useDispatch()
    const [menuDisplay, setMenuDisplay] = useState(false);
    const context = useContext(Context)
    const navigate = useNavigate();
    const searchInput = useLocation()
    const URLSearch = new URLSearchParams(searchInput?.search)
    const searchQuery = URLSearch.getAll("q")
    const [search, setSearch] = useState(searchQuery);

    const handleLogout = async ()=>{
        const fetchData = await fetch(SummaryApi.logout_user.url, {
            method: SummaryApi.logout_user.method,
            credentials: 'include'
        })

        const data = await fetchData.json()

        if(data.success){
            toast.success(data.message)
            dispatch(setUserDetails(null))
            navigate("/")
        }
        if(data.error){
            toast.error(data.error)
        }
    }

    const handleSearch = (e)=>{
        const {value} = e.target
        setSearch(value)

        if(value){
            navigate(`/search?q=${value}`)
        }else{
            navigate('/search')
        }
    }


  return (
    <header className='h-16 shadow-md bg-white fixed w-full z-10'>
      <div className='container mx-auto h-full flex items-center px-4 justify-between'>
        <div className=''>
            <Link to="/">
            <Logo w={90} h={80} />
            </Link>
        </div>
        <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-md pl-2'>
            <input type='text' placeholder='search product' className='w-full outline-none ' onChange={handleSearch} value={search}></input>
            <div className='text-white text-lg min-w-[50px] h-8 bg-blue-600 flex items-center justify-center rounded-r-full cursor-pointer'>
                <IoSearchSharp />
            </div>
        </div>
        <div className='flex items-center gap-4'>
            <div className='relative flex justify-center'>
                {
                    user?._id && (
                    <div className='text-2xl cursor-pointer' onClick={()=>setMenuDisplay(prev=>!prev)}>
                        {user?.profilePic ? (<img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name} />) : <FaRegUser />}
                    
                    </div>
                    )
                }
                
                {
                    menuDisplay && (
                    <div className='absolute bg-white bottom-0 top-11 h-fit shadow-lg rounded p-2 '>
                        <nav>
                            {
                                user?.role === ROLE.ADMIN && (
                                    <Link to={"/admin-panel/all-products"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2 ' onClick={()=>setMenuDisplay(prev=>!prev)}>Admin Panel</Link>
                                )
                            }
                            
                        </nav>
                    </div>
                    )
                }
                
            </div>
                {
                    user?._id && (
                        <Link to={"/cart"} className='text-2xl cursor-pointer relative'>
                            <span><FaShoppingCart/></span>
                            <div className='bg-red-600 text-white w-5 h-5 p-1 flex items-center justify-center rounded-full absolute -top-2 -right-3'>
                                <p className='text-xs'>{context.cartProductCount}</p>
                            </div>
                        </Link>
                    )
                }
            
            <div>
                {
                    user?._id ? (
                        <button onClick={handleLogout} className='px-3 py-1 rounded-full  text-blue-600 bg-white border-2 border-blue-600 hover:bg-blue-600 hover:text-white transition-all'>Logout</button>
                    )
                    :
                    (
                
                <Link to={"/login"} className='px-3 py-1 rounded-full  text-blue-600 bg-white border-2 border-blue-600 hover:bg-blue-600 hover:text-white transition-all'>
                    Login
                </Link>
                    )
                }   
            </div>
        </div>
      </div>
    </header>
  )
}

export default Header
