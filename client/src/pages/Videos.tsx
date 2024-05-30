import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import { toast } from 'react-toastify';

function Videos() {
    const [videosData, setVideosData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        // Fetch videos data
        axios.get('/videos/')
            .then((response) => {
                console.log(response.data)
                setVideosData(response.data);
            })
            .catch((error) => {
                toast.error('Error fetching videos data');
            });
    }, []);

    // useEffect(() => {
    //     if (videosData.length > 0) {
    //         setVideoInfo(videosData[currentIndex]);
    //     }
    // }, [videosData, currentIndex]);

    const videoSelectorHandler = (direction : string) => {
        if (direction === 'next' && currentIndex < videosData.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else if (direction === 'prev' && currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    return ( 
        <div className='max-w-5xl mx-auto px-4'>
            <h1 className="text-2xl font-bold mb-4">{videosData[currentIndex]['title']}</h1>

            {videosData.length > 0 && (
                <video 
                    className="w-full border border-gray-200 rounded-lg"
                    controls 
                    src={`http://127.0.0.1:8000${videosData[currentIndex]['video']}`} 
                />
            )}
            <div>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    onClick={() => videoSelectorHandler('prev')}
                    disabled={currentIndex === 0}
                >
                    Prev
                </button>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    onClick={() => videoSelectorHandler('next')}
                    disabled={currentIndex === videosData.length - 1}
                >
                    Next
                </button>
                <p>{videosData[currentIndex]['description']}</p>
            </div>
        </div>
    );
}

export default Videos;
