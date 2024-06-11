import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import { toast } from 'react-toastify';
import forwardArrow from '../assets/forward_arrow.svg';
import backArrow from '../assets/back_arrow.svg';
import share from '../assets/share.svg';
import { CopyToClipboard } from 'react-copy-to-clipboard';


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

            {videosData.length > 0 && (
            <>
                <video 
                    className="w-full border border-gray-200 rounded-lg"
                    controls 
                    src={`http://127.0.0.1:8000${videosData[currentIndex]['video']}`} 
                />
                <div className='flex bg-violet-50 p-3'>
                    <span className='flex gap-3'>
                        {currentIndex !== 0 &&
                            <button
                                onClick={() => videoSelectorHandler('prev')}
                                disabled={currentIndex === 0}
                            >
                                <img src={backArrow} alt="previos" />
                            </button>
                        }
                        { currentIndex !== videosData.length - 1 ?
                            <button
                                onClick={() => videoSelectorHandler('next')}
                                disabled={currentIndex === videosData.length - 1}
                            >
                                <img src={forwardArrow} alt="next" />
                            </button> : null
                        }
                        <CopyToClipboard text={`http://localhost:5173/video/${videosData[currentIndex]['video_id']}`}
                            onCopy={()=> toast.success('link copied')}>
                            <button><img src={share} alt="share" /></button>
                        </CopyToClipboard>
                        
                    </span>

                    <span className='ml-auto'>
                        <h1 className="text-2xl font-bold mb-4 text-sky-800">{videosData[currentIndex]['title']}</h1>
                        <p className='text-sky-600'>{videosData[currentIndex]['description']}</p>
                    </span>
                </div>
            </>
            )}
        </div>
    );
}

export default Videos;
