import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

    const navigate = useNavigate();


    const submitDetails = async () => {
        if (!email || !password || !username) {
            return alert('please fill all the field')
        }
        if (email.length < 6 || password.length < 6 || username.length < 5) {
            return alert('you have to provide 6 character in each field')
        }
        const result = await axios.post('https://writestory.herokuapp.com/register', {
            username,
            email,
            password
        });
        alert(result.data)
        navigate('/login')
    }
    return (
        <div className='postContainerWidth mx-auto  bg-white p-6 shadow-xl'>
            <div className='pt-6'>
                <h1 className='text-center md:text-2xl text-lg mb-5'>Signin</h1>
                <div>
                    <input placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)} className='w-full  mb-4 h-10 outline-none border-b-2 text-black pl-3' />
                    <input placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} className='w-full  mb-4 h-10 outline-none border-b-2 text-black pl-3' />
                    <input placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} className='w-full mb-4  h-10 outline-none border-b-2 text-black pl-3' />


                    <button className='bg-blue-600 py-3 w-full text-white mt-8  rounded-lg' onClick={submitDetails}>Signin</button>
                </div>
            </div>
        </div>
    )
}
