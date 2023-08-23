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

    const recipeDisplay = recipeCards.map((pictureAndTitle) => {
        return (
            <RecipeCard recipe={pictureAndTitle} />
        )
    });


    return (
        <section className='recipe-section'>
            <div className="recipe-gallery">
                {recipeDisplay}
            </div>
        </section>
    )
}

export default RecipeContainer