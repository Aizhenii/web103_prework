import { Link } from "react-router-dom";
import "./Card.css";

const Card = ({ creator }) => {
    const imageUrl = creator.imageURL || creator.image_url;

    return (
        <article className="Card">
            <Link className="card-details-link" to={`/view-creator/${creator.id}`}>
                {imageUrl && <img src={imageUrl} alt={creator.name} />}
                <h3>{creator.name}</h3>
                
                {creator.description && <p>{creator.description}</p>}
                {creator.url && (
                    <span className="visit-channel-link">
                        Visit Channel
                    </span>
                )}
            </Link>
            <Link
                className="edit-link"
                to={`/edit-creator/${creator.id}`}
                aria-label={`Edit ${creator.name}`}
                title={`Edit ${creator.name}`}
            >
                <svg
                    className="edit-icon"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                >
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
                </svg>
            </Link>
        </article>
    )
}

export default Card;
