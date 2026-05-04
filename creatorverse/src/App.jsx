import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { useRoutes, useNavigate } from 'react-router-dom';

import AddCreator from './pages/AddCreator';
import EditCreator from './pages/EditCreator';
import ShowCreators from './pages/ShowCreators';
import ViewCreator from './pages/ViewCreator';

import './App.css'

function App() {
  const navigate = useNavigate();
  
  const addCreator = () => {
    // make database call to supabase 
    navigate('/add-creator');
  }
  const editCreator = () => {
    // make database call to supabase 
    navigate('/edit-creator');
  }
  const showCreators = () => {
    // make database call to supabase 
    navigate('/show-creators');
  }
  const viewCreator = () => {
    // make database call to supabase 
    navigate('/view-creator');
  }

  const Home = () => (
    <>
      <h1>hello</h1>
      <button onClick={addCreator}>
        Add Content Creator
      </button>
      <button onClick={editCreator}>
        Edit Content Creator
      </button>
      <button onClick={showCreators}>
        Show Content Creators
      </button>
      <button onClick={viewCreator}>
        View Content Creator
      </button>
    </>
  );

  const routes = [
    { path: '/', element: <Home /> },
    { path: '/add-creator', element: <AddCreator /> },
    { path: '/edit-creator', element: <EditCreator /> },
    { path: '/show-creators', element: <ShowCreators /> },
    { path: '/view-creator', element: <ViewCreator /> },
  ];

  return useRoutes(routes);
}

export default App
