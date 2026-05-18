import { useState } from 'react';
import { supabase } from '../client.js';

const AddCreator = ({ isModal = false, onClose, onCreatorAdded }) => {
    const [creator, setCreator] = useState({
        name: '',
        url: '',
        description: '',
        imageURL: '',
    });
    const [message, setMessage] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;

        setCreator((previousCreator) => ({
            ...previousCreator,
            [name]: value,
        }));
    };

    const addCreator = async (event) => {
        event.preventDefault();
        setMessage('');

        const newCreator = {
            name: creator.name,
            url: creator.url,
            description: creator.description,
            imageURL: creator.imageURL || null,
        };

        const { error } = await supabase
            .from('creators')
            .insert(newCreator);

        if (error) {
            console.error('Error adding creator:', error);
            setMessage('Unable to add creator. Please try again.');
            return;
        }

        setCreator({
            name: '',
            url: '',
            description: '',
            imageURL: '',
        });
        setMessage('Creator added successfully.');
        onCreatorAdded?.();
    };

    return (
        <main className={isModal ? 'add-creator-page modal-form' : 'add-creator-page'}>
            <h1 id="add-creator-title">Add Creator</h1>
            <p>Add a new creator profile and details here.</p>
            <form className="creator-form" onSubmit={addCreator}>
                <label>
                    Name
                    <input
                        type="text"
                        name="name"
                        placeholder="Creator name"
                        value={creator.name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    URL
                    <input
                        type="url"
                        name="url"
                        placeholder="https://example.com"
                        value={creator.url}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Description
                    <textarea
                        name="description"
                        placeholder="What does this creator make?"
                        rows="4"
                        value={creator.description}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Image URL
                    <input
                        type="url"
                        name="imageURL"
                        placeholder="https://example.com/image.jpg"
                        value={creator.imageURL}
                        onChange={handleChange}
                    />
                </label>
                <button className="primary-button" type="submit">
                    Add Creator
                </button>
            </form>
            {message && <p className="form-message">{message}</p>}
            {isModal && (
                <button className="secondary-button modal-done-button" type="button" onClick={onClose}>
                    Done
                </button>
            )}
        </main>
    )
}

export default AddCreator;
