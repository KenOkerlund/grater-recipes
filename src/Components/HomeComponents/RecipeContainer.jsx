import './RecipeContainer.css'

import RecipeCard from './RecipeCard'
import axios from 'axios';
import { useState, useEffect } from 'react';

const dummy_data = [{ title: "Test1", text: "text1" }, { title: "Test2", text: 'text2' }];

const RecipeContainer = () => {

    const [recipeCards, setRecipeCards] = useState([]);

    const getRecipeCards = () => {
        axios.get('http://localhost:5432/recipe-cards')
            .then(res => {
                setRecipeCards(res.data);
            })
    }

    useEffect(() => {
        getRecipeCards()
    }, []);

    console.log(recipeCards)

    const recipeCard = recipeCards.map((pictureAndTitle) => {
        return (
            <RecipeCard recipe={pictureAndTitle} />
        )
    });


    return (
        <section className='recipe-section'>
            <div className="recipe-gallery">
                {recipeCard}
            </div>
        </section>
    )
}

export default RecipeContainer