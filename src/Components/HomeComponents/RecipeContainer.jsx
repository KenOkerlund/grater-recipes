import './RecipeContainer.css'

import RecipeCard from './RecipeCard'
import axios from 'axios';
import { useState, useEffect } from 'react';

const RecipeContainer = ({search}) => {
        

    const [recipeCards, setRecipeCards] = useState([]);

    const getRecipeCards = () => {
        axios.get('http://localhost:5432/recipe-cards')
            .then(res => {
                setRecipeCards(res.data);
            })
    }

    useEffect(() => {
        getRecipeCards();
    }, []);

    // const recipeDisplay = recipeCards.map((recipe) => {
    //     return (
    //         <RecipeCard key={recipe.recipe_id} recipe={recipe} />
    //     )
    // });

    const recipeDisplay = recipeCards.filter((recipe) => {
        let title = recipe.recipe_name.toLowerCase();
        let searchParams = search.toLowerCase();
        return title.includes(searchParams)
    })
    .map((recipe) => {
        return <RecipeCard key={recipe.recipe_id} recipe={recipe} />
    })


    return (
            <div className="recipe-gallery">
                {recipeDisplay}
            </div>
    )
}

export default RecipeContainer