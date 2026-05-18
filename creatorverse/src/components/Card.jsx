import "./Card.css";

const Card = ({ creator }) => {
    const imageUrl = creator.imageURL || creator.image_url;

    return (
        <div className="Card">
            {imageUrl && <img src={imageUrl} alt={creator.name} />}
            <h3>{creator.name}</h3>
            {creator.description && <p>{creator.description}</p>}
            {creator.url && (
                <a href={creator.url} target="_blank" rel="noreferrer">
                    Visit Channel
                </a>
            )}
        </div>
    )
}

export default Card;
