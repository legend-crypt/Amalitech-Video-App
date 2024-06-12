import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from '../utils/axios';
import { toast } from 'react-toastify';


interface Video {
    title: string;
    video: string;
    description: string;
    thumbnail: string;
}


function RetriveVideo() {
    const { videoId } = useParams();
    const [videoInfo, setVideoInfo] = useState<Video>({
        title: '',
        video: '',
        description: '',
        thumbnail: ''
    });

    useEffect(() => {
        axios.get(`/videos/${videoId}/`)
            .then((response) => {
                setVideoInfo(response.data);
            })
            .catch((error) => {
                toast.error('Error fetching video data');
            });
    }, [videoId]);

return (
        <div className='max-w-[1000px] border-none  rounded-lg ml-auto mr-auto py-7 w-full'>
            <h1 className="text-5xl font-bold mb-4 text-white">{videoInfo.title}</h1>
            <video
                className="w-full border-none rounded-lg"
                controls
                src={`http://127.0.0.1:8000${videoInfo.video}`}
            />
        </div>
    )
}

export default RetriveVideo