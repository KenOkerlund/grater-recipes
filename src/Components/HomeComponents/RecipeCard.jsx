import './RecipeCard.css'

import {useNavigate} from 'react-router-dom'

const RecipeCard = ({ recipe }) => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/recipe/${recipe.recipe_id}`)
    }

    return (
        <div className='card'>
            <div>
                <div className='card-image'>
                    <img src={recipe.recipe_image} />
                </div>
                <h4>{recipe.recipe_name}</h4>
            </div>
            <button onClick={handleClick}>See Recipe</button>
        </div>
    )

}

export default RecipeCard