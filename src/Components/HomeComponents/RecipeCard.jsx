import './RecipeCard.css'

const RecipeCard = ({ recipe }) => {
    return (
        <div className='card'>
            <div>
                <div className='card-image'>
                    <img src={recipe.recipe_image} />
                </div>
                <h4>{recipe.recipe_name}</h4>
            </div>
            <button>See Recipe</button>
        </div>
    )

}

export default RecipeCard