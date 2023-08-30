import './RecipeContainer.css'

import RecipeCard from './RecipeCard'
import axios from 'axios';
import { useState, useEffect } from 'react';

const RecipeContainer = () => {

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

    const recipeDisplay = recipeCards.map((recipe) => {
        return (
            <RecipeCard key={recipe.recipe_id} recipe={recipe} />
        )
    });


    return (
            <div className="recipe-gallery">
                {recipeDisplay}
            </div>
    )
}

export default RecipeContainer