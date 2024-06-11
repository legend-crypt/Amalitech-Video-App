import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from '../utils/axios';


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
                console.log(response.data)
                setVideoInfo(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [videoId]);

return (
        <div className='max-w-5xl mx-auto px-4'>
            <h1 className="text-2xl font-bold mb-4">{videoInfo.title}</h1>
            <video
                className="w-full border border-gray-200 rounded-lg"
                controls
                src={`http://127.0.0.1:8000${videoInfo.video}`}
            />
            <p>{videoInfo.description}</p>
        </div>
    )
}

export default RetriveVideo