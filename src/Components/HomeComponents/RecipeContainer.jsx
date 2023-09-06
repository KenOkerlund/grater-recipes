import './RecipeContainer.css'

import RecipeCard from './RecipeCard'
import axios from 'axios';
import { useState, useEffect } from 'react';
import LoadingModal from '../ElementComponents/LoadingModal';

const RecipeContainer = ({ search }) => {

    const [isLoading, setIsLoading] = useState(true);

    const [recipeCards, setRecipeCards] = useState([]);

    const getRecipeCards = () => {
        axios.get('http://localhost:5432/recipe-cards')
            .then(res => {
                setRecipeCards(res.data);
            })
    };

    useEffect(() => {
        getRecipeCards();
        setIsLoading(false);
    }, []);

    const recipeDisplay = recipeCards.filter((recipe) => {
        let title = recipe.recipe_name.toLowerCase();
        let searchParams = search.toLowerCase();
        return title.includes(searchParams)
    })
        .map((recipe) => {
            return <RecipeCard key={recipe.recipe_id} recipe={recipe} />
        });

    if(!isLoading && recipeDisplay.length === 0) {
        return <div className='recipe-gallery'>
            <h2 className='missing-recipes'>No recipes found</h2>
        </div>
    }

    return (
        <div className="recipe-gallery">
            {isLoading && <LoadingModal />}
            {recipeDisplay}
        </div>
    )
}

export default RecipeContainer