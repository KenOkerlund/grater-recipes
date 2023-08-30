import './EditModal.css'

import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

function filterNonDigitsAndMakeNumber(stringWithPossibleNonDigits) {
    return Number(stringWithPossibleNonDigits.replace(/[^0-9]/g, ''));
};


const EditModal = (props) => {
    const [state, setState] = useState({
        title: "",
        imageURL: "",
        servings: 0,
        timeToMake: 0,
        ingredients: [
            {
                quantity: "",
                ingredient: '',
            },
        ],
        instructions: [
            {
                instructionText: ''
            }
        ]
    });

    const putEditRecipeForm = () => {

    }

    const setStateField = (name, value) => {
        setState({
            ...state,
            [name]: value
        });
    };

    useEffect(() => {
        updateTheStateWithCurrentRecipe();
    }, []);

    const setStateOnLoad = (name, value) => {
        setState({
            [name]: value 
        });
    };

    function updateTheStateWithCurrentRecipe() {
        // setStateOnLoad('title', props.recipe.recipe_name);
        // setStateOnLoad('imageURL', props.recipe.recipe_image);
        // setStateOnLoad('servings', props.recipe.servings);
        // setStateOnLoad('timeToMake', props.recipe.time_to_make);
        // setStateOnLoad('ingredients', props.recipe.quantity_ingredient);
        // setStateOnLoad('instructions', props.recipe.instruction);
    }

    const handleNameChange = (e) => setStateField('title', e.target.value);
    const handleImageURLChange = (e) => setStateField('imageURL', e.target.value);
    const handleServingsChange = (e) => setStateField('servings', filterNonDigitsAndMakeNumber(e.target.value));
    const handleTimeToMakeChange = (e) => setStateField('timeToMake', filterNonDigitsAndMakeNumber(e.target.value));

    const handleIngredientQuantityChange = (e, i) => {
        const newIngredients = [...state.ingredients];
        // newIngredients[i].quantity = filterNonDigitsAndMakeNumber(e.target.value);
        // newIngredients[i].quantity = filterNonDigitsAndSlash(e.target.value);
        newIngredients[i].quantity = e.target.value;
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

    const handleDeleteInstruction = (i) => {
        // const newInstructions = [...state.instructions];
        // setStateField('instructions', newInstructions.splice(i, 0));
    }

    const isAddIngredientButtonDisabled = state.ingredients.some((ingredient) => {
        return ingredient.quantity === '' || ingredient.quantity === 0 || ingredient.ingredient.trim() === '';
    });

    const isAddInstructionButtonDisabled = state.instructions.some((instruction) => {
        return instruction.instructionText.trim() === '';
    });

    return (
        <div className='modal-backdrop' >
            <form className='edit-form-div' onSubmit={putEditRecipeForm}>
                <div className='double-form'>
                    <div className='form-input'>
                        <label htmlFor='recipeTitle'>Title</label>
                        <input type="text" placeholder='Recipe Name' name="title" value={state.title} onChange={handleNameChange} />
                    </div>
                    <div className='form-input'>
                        <label htmlFor='imageURL'>Image URL</label>
                        <input type="text" placeholder='Image URL' name="imageURL" value={state.imageURL} onChange={handleImageURLChange} />
                    </div>
                </div>
                <div className='double-form'>
                    <div className='form-input'>
                        <label htmlFor='servings'>Servings</label>
                        <input type="text" placeholder='Servings' name="servings" value={state.servings} onChange={handleServingsChange} />
                    </div>
                    <div className='form-input'>
                        <label htmlFor='timeToMake'>Time to make (minutes)</label>
                        <input type="text" placeholder='Time to make' name="timeToMake" value={state.timeToMake} onChange={handleTimeToMakeChange} />
                    </div>
                </div>
                <div className='double-form'>
                    <div className='form-input'>
                        <label htmlFor='ingredient'>Ingredient</label>
                        {state.ingredients.map((ingredient, i) => {
                            return (
                                <div key={i}>
                                    <input type="text" placeholder='Measurement and Ingredient' name="ingredient" value={ingredient.ingredient} onChange={(e) => handleIngredientIngredientChange(e, i)} />
                                </div>
                            )
                        })}
                    </div>
                    <div className='form-input'>
                        <label htmlFor="quantity">Quantity</label>
                        {state.ingredients.map((ingredient, i) => {
                            return (
                                <div key={i} className='can-delete'>
                                    <input type="text" placeholder='Quantity' name="quantity" value={ingredient.quantity} onChange={(e) => handleIngredientQuantityChange(e, i)} />
                                    <button type='button' className='form-field-delete'>X</button>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className='add-button-div'>
                    <button disabled={isAddIngredientButtonDisabled} type="button" onClick={handleAddIngredient}>Next ingredient</button>
                </div>
                <div className='form-input'>
                    <label htmlFor='instruction'>Instruction</label>
                    {state.instructions.map((instruction, i) => {
                        return (
                            <div key={i} className='can-delete'>
                                <input type="text" className='long' placeholder='Instruction' name="instruction" value={instruction.instruction} onChange={(e) => handleInstructionChange(e, i)} />
                                <button type='button' className='form-field-delete' onClick={() => handleDeleteInstruction(i)}>X</button>
                            </div>
                        );
                    })}
                </div>
                <div className='add-button-div'>
                    <button disabled={isAddInstructionButtonDisabled} type='button' onClick={handleAddInstruction}>Next instruction</button>
                </div>
                <div className='form-submit'>
                    <button type='button' onClick={props.onCancel}>CLOSE THIS MODAL!</button>
                    <button type='submit' className='copy-submit-btn'>Submit</button>
                </div>
            </form >
        </div>
    )
}

export default EditModal;
