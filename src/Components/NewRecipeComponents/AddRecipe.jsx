/*
How to remove e from my form number inputs


Need to have the ability to duplicate form inputs (ingredients and instructions)
    Need to have my array based inputs actually insert an array into state


*/

import './AddRecipe.css'

import { useState } from 'react';

function filterNonDigitsAndMakeNumber(stringWithPossibleNonDigits) {
    return Number(stringWithPossibleNonDigits.replace(/[^0-9]/g, ''));
}

const AddRecipe = () => {
    const [state, setState] = useState({
        title: "Gmas GG Cookies",
        imageURL: "",
        servings: 1,
        timeToMake: 1,
        ingredients: [
            {
                quantity: 1,
                ingredient: 'Cup of Flour',
            },
            {
                quantity: 2,
                ingredient: 'Cups of BUTTER',
            }
        ],
        instructions: []
    });

    const setStateField = (name, value) => {
        setState({
            ...state,
            [name]: value
        });
    };

    const handleNameChange = (e) => setStateField('title', e.target.value);
    const handleImageURLChange = (e) => setStateField('imageURL', e.target.value);
    const handleServingsChange = (e) => setStateField('servings', filterNonDigitsAndMakeNumber(e.target.value));
    const handleTimeToMakeChange = (e) => setStateField('timeToMake', filterNonDigitsAndMakeNumber(e.target.value));
    const handleIngredientQuantityChange = (e, i) => {
        const newIngredients = [...state.ingredients];
        newIngredients[i].quantity = filterNonDigitsAndMakeNumber(e.target.value);
        setStateField("ingredients", newIngredients);
    };
    const handleIngredientIngredientChange = (e, i) => {
        const newIngredients = [...state.ingredients];
        newIngredients[i].ingredient = e.target.value;
        setStateField("ingredients", newIngredients);
    };

    const handleAddIngredient = () => {
        const newIngredients = [...state.ingredients, {
            quantity: "",
            ingredient: ""
        }];
        setStateField('ingredients', newIngredients)
    };

    const isAddIngredientButtonDisabled = state.ingredients.some((ingredient) => {
        return ingredient.quantity === '' || ingredient.quantity === 0 || ingredient.ingredient.trim() === '';
    });

    console.log(state);

    return (
        <div className='new-recipe-display'>
            <form>
                <div className='copy-recipe'>
                    <h4>For premade recipes:</h4>
                    <input type="text" placeholder='Paste recipe URL here' />
                    <button type='submit'>Submit</button>
                </div>
            </form>
            <div className='new-recipe'>
                <form>
                    <h4>Make from scratch:</h4>
                    <div className='form-div'>
                        <input type="text" placeholder='Recipe Name' name="title" value={state.title} onChange={handleNameChange} />
                        <input type="text" placeholder='Image URL' name="imageURL" value={state.imageURL} onChange={handleImageURLChange} />
                    </div>
                    <div className='form-div'>
                        <input type="text" placeholder='Servings' name="servings" value={state.servings} onChange={handleServingsChange} />
                        <input type="text" placeholder='Time to make' name="timeToMake" value={state.timeToMake} onChange={handleTimeToMakeChange} />
                    </div>
                    <div className='form-div'>
                        {state.ingredients.map((ingredient, i) => {
                            return (
                                <div key={i}>
                                    <input type="text" placeholder='Quantity' name="quantity" value={ingredient.quantity} onChange={(e) => handleIngredientQuantityChange(e, i)} />
                                    <input type="text" placeholder='Measurement and ingredient' name="ingredient" value={ingredient.ingredient} onChange={(e) => handleIngredientIngredientChange(e, i)} />
                                </div>
                            );
                        })}

                        <button disabled={isAddIngredientButtonDisabled} type="button" onClick={handleAddIngredient}>Next ingredient</button>
                    </div>
                    <div className='form-div'>
                        <input type="text" placeholder='Instruction' name="instruction" value={state.instruction} onChange={setStateField} />
                        <button type='button'>Next instruction</button>
                    </div>
                    <button type='submit'>Submit</button>
                </form >
            </div>
        </div>
    )
}

export default AddRecipe;
