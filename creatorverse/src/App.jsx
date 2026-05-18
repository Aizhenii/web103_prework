import { useEffect, useState } from 'react'
import { useRoutes, useNavigate } from 'react-router-dom';
import { supabase } from './client.js';

import AddCreator from './pages/AddCreator';
import EditCreator from './pages/EditCreator';
import ShowCreators from './pages/ShowCreators';
import ViewCreator from './pages/ViewCreator';

import './App.css'

function App() {
  const navigate = useNavigate();
  const [creators, setCreators] = useState([]);
  const [isAddCreatorOpen, setIsAddCreatorOpen] = useState(false);
  
  const addCreator = () => {
    setIsAddCreatorOpen(true);
  }
  const showCreators = () => {
    // make database call to supabase 
    navigate('/show-creators');
  }

  const refreshCreators = async () => {
    const { data, error } = await supabase
      .from('creators')
      .select();

    if (error) {
      console.error('Error fetching creators:', error);
      return;
    }

    setCreators(data ?? []);
  };

  useEffect(() => {
    const fetchCreators = async () => {
      const { data, error } = await supabase
        .from('creators')
        .select();

      if (error) {
        console.error('Error fetching creators:', error);
        return;
      }

      setCreators(data ?? []);
    };

    fetchCreators();
  }, []);

  const home = (
    <main className="home-page">
      <section className="home-hero">
        <div>
          <p className="eyebrow">Creatorverse</p>
          <h1>Discover your favorite creators</h1>
          <p className="hero-copy">
            Keep track of inspiring channels, links, and profiles all in one place.
          </p>
        </div>
        <div className="hero-actions">
          <button className="primary-button" onClick={addCreator}>
            Add Creator
          </button>
          <button className="secondary-button" onClick={showCreators}>
            View All
          </button>
        </div>
      </section>

      <ShowCreators creators={creators} title="Featured Creators" />

      {isAddCreatorOpen && (
        <div className="modal-overlay" onClick={() => setIsAddCreatorOpen(false)}>
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-creator-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="close-button"
              type="button"
              aria-label="Close add creator form"
              onClick={() => setIsAddCreatorOpen(false)}
            >
              Close
            </button>
            <AddCreator
              isModal
              onClose={() => setIsAddCreatorOpen(false)}
              onCreatorAdded={refreshCreators}
            />
          </div>
        </div>
      )}
    </main>
  );

  const routes = [
    { path: '/', element: home },
    { path: '/add-creator', element: <AddCreator /> },
    { path: '/edit-creator', element: <EditCreator /> },
    { path: '/show-creators', element: <ShowCreators creators={creators} /> },
    { path: '/view-creator/:id', element: <ViewCreator /> },
  ];

  return useRoutes(routes);
}

export default App
