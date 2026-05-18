import { Link } from 'react-router-dom';
import Card from '../components/Card';

const ShowCreators = ({ creators, title = 'Content Creators', showHomeLink = false }) => {
  return (
    <main className="show-creators-page">
      {showHomeLink && <Link className="back-link" to="/">Back Home</Link>}
      <h2>{title}</h2>
      {creators.length > 0 ? (
        <section className="creator-list">
          {creators.map((creator) => (
            <Card key={creator.id} creator={creator} />
          ))}
        </section>
      ) : (
        <p>No content creators found.</p>
      )}
    </main>
  );
};

export default ShowCreators;
