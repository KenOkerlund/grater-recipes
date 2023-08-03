import './RecipeCard.css'

const RecipeCard = ({ recipe }) => {
    return (
        <div className='card'>
            <h3>{recipe.title}</h3>
            <h4>{recipe.text}</h4>
        </div>
    )

}

export default RecipeCard