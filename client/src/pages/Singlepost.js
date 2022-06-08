import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'

export default function Singlepost() {
    const [post, setPost] = useState('')
    const params = useParams();
    const navigate = useNavigate()

    const id = params.id;


    const user = JSON.parse(localStorage.getItem('user'));


    useEffect(() => {
        const fetchPosts = async () => {
            const result = await axios.get(`https://writestory.herokuapp.com/singlepost/${id}`)
            setPost(result.data)
        };
        fetchPosts()
    }, [post])

    const likePost = async (id) => {
        const likeRes = await axios.put('https://writestory.herokuapp.com/like', {
            postId: id
        },
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
        console.log('clicked')
    }

    const dislikePost = async (id) => {
        await axios.put('https://writestory.herokuapp.com/unlike', {
            postId: id
        },
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
    }

    const deletePost = async (id) => {
        await axios.delete(`https://writestory.herokuapp.com/deletepost/${id}`);
        alert('post deleted succesfully');
        navigate('/')
    }

    return (
        <div className='container mx-auto'>
            <div className=' bg-white mb-4 mt-10 singlePostWidthHeight' >
                <div className='w-full h-80 md:px-0 px-4'>
                    {
                        post.photo ? <img src={post.photo} className='w-full h-full' alt='blog pic' />
                            :
                            <img src='https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max' className='w-full h-full' alt='blog pic' />
                    }

                </div>
                <div className='flex justify-between items-center mt-8 px-5'>
                    <p className='md:text-lg md:font-semibold'>postedBy : <span className='text-lg text-red-500 md:font-semibold md:ml-2'>{post?.postedBy?.username}</span></p>
                    <p className='text-gray-500'>{new Date(post?.posttime).toDateString()}</p>
                </div>



                <div className='px-6 my-5 flex justify-between items-center'>
                    <div>
                        {
                            post?.likes?.includes(user?._id) ? <i onClick={() => dislikePost(post._id)} className="fa-solid fa-heart text-red-600 text-2xl"><span className='ml-4 text-2xl -mt-2'>{post?.likes?.length}</span></i> : <i className="fa-solid fa-heart text-2xl text-black" onClick={() => likePost(post._id)}><span className='text-2xl  font-semibold ml-4 -mt-2'>{post?.likes?.length}</span></i>
                        }
                    </div>
                    {
                        post?.postedBy?._id == user?._id && <div>
                            <span onClick={() => deletePost(post._id)}><i className="fa-solid fa-trash-can md:text-2xl"></i></span>
                        </div>
                    }


                </div>


                <div className='mt-2 p-5'>
                    <p className='mb-2 font-bold text-lg md:text-2xl'>{post.title}</p>
                    <h1 className='md:leading-10 leading-8 mt-10  md:text-lg  tracking-wide'>{post.description} </h1>
                </div>

                <div className='p-6'>
                    <p className='font-bold text-lg mb-2'>Share in Social site!</p>
                    <Link to="" className='py-2 px-6 bg-red-600 text-white '><i className="fa-brands fa-facebook text-lg"></i></Link>
                    <Link to="" className='py-2 px-6 bg-red-600 text-white '><i className="fa-brands fa-instagram" ></i></Link>
                    <Link to="" className='py-2 px-6 bg-red-600 text-white '><i className="fa-brands fa-twitter"></i></Link>
                    <Link to="" className='py-2 px-6 bg-red-600 text-white '> <i className="fa-brands fa-facebook-messenger"></i></Link>
                </div>

            </div>
        </div>
    )
}


