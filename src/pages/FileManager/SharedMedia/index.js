import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { message } from 'antd';
import { useParams } from 'react-router-dom';
import linkDamaged from "../../../assets/img/linkDamaged.png"

const SharedMedia = () => {
    const [media, setMedia] = useState(null);
    const [mediaNotFound, setMediaNotFound] = useState(false);
    const { shareId } = useParams();

    useEffect(() => {
        const fetchMedia = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BaseUrl}/api/medias/shared/${shareId}`);
                if(response?.data?.message === "Media not found"){
                    setMediaNotFound(true)
                }
                const mediaData = response.data;
                mediaData.url = `${process.env.REACT_APP_BaseUrl}${mediaData.url}`; 
                setMedia(mediaData);
            } catch (error) {
                message.error('Failed to load media');
            }
        };

        fetchMedia();
    }, [shareId]);

    if (mediaNotFound) {
        return (
        <>
        <img width={80} src={linkDamaged} alt="link broken" />
        <h3>Link Broken</h3>
        </>
         )
    } else if (!media){
        return <div>Loading ...</div>;
    }

    return (
        <div>
            <h1>{media.name}</h1>
            {media.type.startsWith('image/') ? (
                <img src={media.url} alt={media.name} style={{ width: '100%' }} />
            ) : (
                <video controls style={{ width: '100%' }}>
                    <source src={media.url} type={media.type} />
                    Your browser does not support the video tag.
                </video>
            )}
            <p><strong>Tags:</strong> {media.tags.join(', ')}</p>
            <p><strong>Size:</strong> {media.size}</p>
            <p><strong>Uploaded:</strong> {new Date(media.uploadDate).toLocaleDateString()}</p>
            <p><strong>Views:</strong> {media.views}</p>
            <p><strong>Shares:</strong> {media.shares}</p>
        </div>
    );
};

export default SharedMedia;
