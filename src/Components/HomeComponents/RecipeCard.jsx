import './RecipeCard.css'

import { useNavigate } from 'react-router-dom'

const RecipeCard = ({ recipe }) => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/recipe/${recipe.recipe_id}`)
    };

    return (
        <div className='card' onClick={handleClick}>
            <img src={recipe.recipe_image} alt="Food" className="gallery-image" />
            <h6 className='card-title'>{recipe.recipe_name}</h6>
        </div>
    );
};

export default RecipeCard;