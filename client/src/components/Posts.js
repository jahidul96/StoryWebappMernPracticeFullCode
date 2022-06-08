import React from 'react'
import { Link } from 'react-router-dom'

export default function Posts({ allposts }) {
    return (
        <div className='p-5'>
            <div className='flex flex-col md:flex-row justify-around items-center flex-wrap'>
                {
                    allposts.length == 0 ? <p>Loading...</p> :
                        allposts.map((data) => (
                            <div className='cardWidth bg-white mb-10' key={data._id}>
                                {
                                    data.photo ? <div className='w-full h-48'>
                                        <img src={data.photo} alt="image" className='w-full h-full' />
                                    </div>
                                        :
                                        <div className='w-full h-48 '>
                                            <img src='https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max' className='w-full h-full' alt='blog pic' />
                                        </div>
                                }


                                <div className=' p-5'>
                                    <div className='flex justify-between items-center mb-4'>
                                        <p className='text-lg '>{data.postedBy.username}</p>
                                        <p>{new Date(data.posttime).toDateString()}</p>
                                    </div>
                                    <p className='mb-2 md:font-bold font-semibold text-lg'>{data.title.length > 30 ? data.title.slice(0, 29) + '...' : data.title}</p>
                                    <p className='leading-6 mt-2 '>{data.description.length > 100 ? data.description.slice(0, 99).toLowerCase() + '...' : data.description}</p>
                                    <Link to={`/blog/${data._id}`}> <button className='bg-blue-600 py-2 px-6 rounded-md text-white mt-4'>See More</button></Link>
                                </div>
                            </div>
                        ))
                }

            </div>
        </div>
    )
}




