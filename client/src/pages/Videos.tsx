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

    const videoSelectorHandler = (direction : string) => {
        if (direction === 'next' && currentIndex < videosData.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else if (direction === 'prev' && currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    return ( 
        <div className='container mx-auto'>

            {videosData.length > 0 && (
            <>
                <video 
                    className="max-w-[1000px] border-none  rounded-lg ml-auto mr-auto py-4 w-full"
                    controls 
                    src={videosData[currentIndex]['video']}
                    poster={videosData[currentIndex]['thumbnail']}
                />
                <div className='bg-white'>
                    <div className='max-w-[1000px] ml-auto mr-auto flex py-5'>
                        <span className='w-1/3	flex gap-3'>
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
                        <span className='w-3/4	ml-auto text-justify'>
                            <h1 className="text-2xl font-bold mb-4 text-primary-950">{videosData[currentIndex]['title']}</h1>
                            <p className='text-primary-950'>{videosData[currentIndex]['description']}</p>
                        </span>
                    </div>
                </div>
            </>
            )}
        </div>
    );
}

export default Videos;
