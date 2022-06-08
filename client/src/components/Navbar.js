import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
    const navigate = useNavigate()


    const user = JSON.parse(localStorage.getItem('user'))


    const logout = () => {
        localStorage.clear();
        navigate('/')

    }

    return (
        <div className='bg-blue-600 text-white shadow-sm'>
            <div className=''>
                <nav className='flex justify-between items-center px-4 md:px-0  container mx-auto py-6'>
                    <h1 className='md:text-2xl text-lg -mb-2 font-semibold'><Link to="/">Story's</Link></h1>
                    <ul className='flex space-x-6 pt-3'>

                        {
                            user ? <><li><Link to="/createpost">Write Story</Link></li>
                                <li onClick={logout} className='bg-red-600 py-1 px-3 text-white rounded-lg -mt-1 cursor-pointer'>Logout</li>
                            </>
                                : <>
                                    <li><Link to="/register">Signin</Link></li>
                                    <li><Link to="/login">Login</Link></li>
                                </>
                        }

                    </ul>
                </nav>
            </div>
        </div>
    )
}
