import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const submitDetails = async () => {
        const result = await axios.post('https://writestory.herokuapp.com/login', {
            email,
            password
        });

        if (result.data === "invalid creadential's") {
            alert("invalid creadential's")
        } else {
            alert('succesfully logged in');
            localStorage.setItem('token', result.data.token);
            localStorage.setItem('user', JSON.stringify(result.data.user));
            navigate('/')
        }



    }
    return (
        <div className='postContainerWidth mx-auto  bg-white p-6 shadow-xl'>
            <div className='pt-6'>
                <h1 className='text-center md:text-2xl text-lg  mb-5'>Login</h1>
                <div>
                    <input placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} className='w-full  mb-4 h-10 outline-none border-b-2 text-black pl-3' />
                    <input placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} className='w-full mb-4  h-10 border-b-2 outline-none text-black pl-3' />


                    <button onClick={submitDetails} className='bg-blue-600 py-3 w-full text-white mt-8  rounded-lg' >Login</button>
                </div>
            </div>
        </div>
    )
}





