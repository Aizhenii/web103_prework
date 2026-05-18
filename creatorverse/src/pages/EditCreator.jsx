import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../client.js';

const EditCreator = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchCreator = async () => {
      setIsLoading(true);
      setMessage('');

      const { data, error } = await supabase
        .from('creators')
        .select()
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching creator:', error);
        setMessage('Unable to load this creator.');
        setIsLoading(false);
        return;
      }

      setCreator({
        name: data.name ?? '',
        url: data.url ?? '',
        description: data.description ?? '',
        imageURL: data.imageURL ?? data.image_url ?? '',
      });
      setIsLoading(false);
    };

    fetchCreator();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setCreator((previousCreator) => ({
      ...previousCreator,
      [name]: value,
    }));
  };

  const updateCreator = async (event) => {
    event.preventDefault();
    setMessage('');

    const updatedCreator = {
      name: creator.name,
      url: creator.url,
      description: creator.description,
      imageURL: creator.imageURL || null,
    };

    const { data, error } = await supabase
      .from('creators')
      .update(updatedCreator)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating creator:', error);
      setMessage('Unable to update creator. Please try again.');
      return;
    }

    setCreator({
      name: data.name ?? '',
      url: data.url ?? '',
      description: data.description ?? '',
      imageURL: data.imageURL ?? data.image_url ?? '',
    });
    setMessage('Creator updated successfully.');
  };

  const deleteCreator = async () => {
    setMessage('');

    const { error } = await supabase
      .from('creators')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting creator:', error);
      setMessage('Unable to delete creator. Please try again.');
      return;
    }

    navigate('/');
  };

  if (isLoading) {
    return (
      <main className="edit-creator-page">
        <p>Loading creator...</p>
      </main>
    );
  }

  return (
    <main className="edit-creator-page">
      <Link className="back-link" to={`/view-creator/${id}`}>Back to creator</Link>
      <h1>Edit Creator</h1>
      <p>Update creator profile and details here.</p>
      <form className="creator-form" onSubmit={updateCreator}>
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
        <button className="primary-button" type="submit">Save Changes</button>
        <button className="delete-button" type="button" onClick={deleteCreator}>
          Delete Creator
        </button>
      </form>
      {message && <p className="form-message">{message}</p>}
    </main>
  );
};

export default EditCreator;
