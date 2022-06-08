import React, { useEffect, useState } from 'react'
import Posts from '../components/Posts'
import axios from 'axios'

export default function Home() {
    const [allposts, setAllPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const result = await axios.get('https://writestory.herokuapp.com/allpost')
            setAllPosts(result.data)
        };
        fetchPosts();

    }, [])
    return (
        <div className='bg-gray-200 h-full'>
            <div className='container mx-auto'>
                <Posts allposts={allposts} />
            </div>
        </div>
    )
}
