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
            </Link>
            {creator.url && (
                <a href={creator.url} target="_blank" rel="noreferrer">
                    Visit Channel
                </a>
            )}
            <Link className="edit-link" to={`/edit-creator/${creator.id}`}>
                Edit
            </Link>
        </article>
    )
}

export default Card;
