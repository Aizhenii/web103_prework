import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { supabase } from '../client.js';

const ViewCreator = () => {
    const { id } = useParams();
    const [creator, setCreator] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchCreator = async () => {
            setIsLoading(true);
            setErrorMessage('');

            const { data, error } = await supabase
                .from('creators')
                .select()
                .eq('id', id)
                .single();

            if (error) {
                console.error('Error fetching creator:', error);
                setErrorMessage('Unable to load this creator.');
                setCreator(null);
                setIsLoading(false);
                return;
            }

            setCreator(data);
            setIsLoading(false);
        };

        fetchCreator();
    }, [id]);

    if (isLoading) {
        return (
            <main className="view-creator-page">
                <p>Loading creator...</p>
            </main>
        );
    }

    if (errorMessage || !creator) {
        return (
            <main className="view-creator-page">
                <p>{errorMessage || 'Creator not found.'}</p>
                <Link to="/">Back to creators</Link>
            </main>
        );
    }

    const imageUrl = creator.imageURL || creator.image_url;

    return (
        <main className="view-creator-page">
            <Link className="back-link" to="/">Back to creators</Link>
            {imageUrl && <img className="creator-detail-image" src={imageUrl} alt={creator.name} />}
            <section className="creator-detail">
                <h1>{creator.name}</h1>
                {creator.description && <p>{creator.description}</p>}
                {creator.url && (
                    <a href={creator.url} target="_blank" rel="noreferrer">
                        Visit {creator.name}
                    </a>
                )}
            </section>
        </main>
    );
}

export default ViewCreator;
