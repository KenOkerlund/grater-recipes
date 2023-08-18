const DetailImage = ({ recipe_image }) => {
    return (
            <img src={recipe_image} alt="A picture of what this ingredient makes." className="detail-image"/>
    )
}

export default DetailImage;