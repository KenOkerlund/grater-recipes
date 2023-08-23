/*
Need to:

1. be able to delete form rows in case someone messes up data entry

2. add the "can't be zero" or "cannot be empty" logic to the other form areas

3. Allow .5 or 1/2 measurement types not just digits
*/

import './AddRecipe.css'

import { useState } from 'react';
import axios from 'axios';

function filterNonDigitsAndMakeNumber(stringWithPossibleNonDigits) {
    return Number(stringWithPossibleNonDigits.replace(/[^0-9]/g, ''));
};


const AddRecipe = () => {
    const [state, setState] = useState({
        title: "",
        imageURL: "",
        servings: 0,
        timeToMake: 0,
        ingredients: [
            {
                quantity: 0,
                ingredient: '',
            },
            // {
            //     quantity: 2,
            //     ingredient: 'Cups of BUTTER',
            // }
        ],
        instructions: [
            {
                instructionText: ''
            }
        ]
    });

    function postAddRecipeForm() {
        console.log('REACHED HERE')
        axios.post('http://localhost:5432/add-recipe/submit', {body: state})
            .then(res => {
                console.log(res.data);
            })
    };

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

    const handleInstructionChange = (e, i) => {
        const newInstructions = [...state.instructions];
        newInstructions[i].instructionText = e.target.value;
        setStateField("instructions", newInstructions);
    };

    const handleAddInstruction = () => {
        const newInstructions = [...state.instructions, {
            instructionText: ""
        }];
        setStateField('instructions', newInstructions);
    };

    const isAddIngredientButtonDisabled = state.ingredients.some((ingredient) => {
        return ingredient.quantity === '' || ingredient.quantity === 0 || ingredient.ingredient.trim() === '';
    });

    const isAddInstructionButtonDisabled = state.instructions.some((instruction) => {
        return instruction.instructionText.trim() === '';
    })

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
                <form onSubmit={postAddRecipeForm}>
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
                        {state.instructions.map((instruction, i) => {
                            return (
                                <div key={i}>
                                    <input type="text" placeholder='Instruction' name="instruction" value={instruction.instruction} onChange={(e) => handleInstructionChange(e, i)} />
                                </div>
                            );
                        })}
                        <button disabled={isAddInstructionButtonDisabled} type='button' onClick={handleAddInstruction}>Next instruction</button>
                    </div>
                    <button type='submit'>Submit</button>
                </form >
            </div>
        </div>
    )
}

export default AddRecipe;
