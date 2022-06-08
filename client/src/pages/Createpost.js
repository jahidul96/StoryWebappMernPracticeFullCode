import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export default function Createpost() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    let navigate = useNavigate();

    const submitData = async () => {
        if (!title || !description || !image) {
            return alert('please fill all the field')
        }
        if (title.length < 8 || description.length < 150) {
            return alert('you have to provide minimum 10 character for title and 150 for description to post')
        }
        try {
            const data = new FormData()
            data.append('file', image)
            data.append('upload_preset', 'blogapp')
            data.append('cloud_name', 'mydemoapp');
            const response = await axios.post('https://api.cloudinary.com/v1_1/mydemoapp/image/upload', data)
            const result = await axios.post('https://writestory.herokuapp.com/createpost', {
                title,
                description,
                photo: response.data.url
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            alert(result.data)
            navigate('/')
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <div className='postContainerWidth mx-auto    bg-white p-6 shadow-xl'>
            <div className='pt-6'>
                <h1 className='text-center md:text-2xl text-lg  mb-5'>Create Blog</h1>
                <div>
                    <input placeholder='title' value={title} onChange={(e) => setTitle(e.target.value)} className='w-full  mb-4 h-8 outline-none text-black pl-3' />
                    <textarea placeholder='description' value={description} onChange={(e) => setDescription(e.target.value)} className='w-full textareaHeight py-5 mb-4 mt-8  outline-none text-black pl-3' />
                    <div>
                        <input type="file" className='ml-2' onChange={(e) => setImage(e.target.files[0])} />
                    </div>

                    <button className='bg-blue-600 py-3 w-full text-white mt-8  rounded-lg' onClick={submitData}>Submit</button>
                </div>
            </div>
        </div>
    )
}
