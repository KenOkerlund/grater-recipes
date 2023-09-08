import './AddRecipe.css'

import { useState, useRef } from 'react';
import axios from 'axios';
import CopyRecipe from './CopyRecipe';

function createState() {
    return {
        title: "",
        imageURL: "",
        servings: 0,
        timeToMake: 0,
        ingredients: [
            {
                id: 0,
                ingredient: '',
            },
        ],
        instructions: [
            {
                id: 0,
                instructionText: '',
            },
        ]
    }
}


const AddRecipe = () => {
    const [state, setState] = useState(createState());
    const [loadingRecipe, setLoadingRecipe] = useState(false);
    const lastInstructionInputRef = useRef();
    const lastIngredientInputRef = useRef();

    function postAddRecipeForm() {
        axios.post('http://localhost:5432/add-recipe/submit', { body: state })
            .then(res => {
                console.log(res.data);
            }).finally(
                setState(createState())
            );
    };

    const setStateField = (name, value) => {
        setState({
            ...state,
            [name]: value
        });
    };

    const handleNameChange = (e) => setStateField('title', e.target.value);
    const handleImageURLChange = (e) => setStateField('imageURL', e.target.value);
    const handleServingsChange = (e) => setStateField('servings', e.target.value);
    const handleTimeToMakeChange = (e) => setStateField('timeToMake', e.target.value);

    const handleIngredientChange = (e, i) => {
        const newIngredients = [...state.ingredients];
        newIngredients[i].ingredient = e.target.value;
        setStateField("ingredients", newIngredients);
    };

    const handleAddIngredient = () => {
        const newId = Math.max(...state.ingredients.map((ingredient) => ingredient.id)) + 1;
        const newIngredients = [...state.ingredients, {
            id: newId,
            ingredient: ""
        }];
        setStateField('ingredients', newIngredients);
        setTimeout(() => {
            lastIngredientInputRef.current.focus();
        }, 0);
    };

    const handleDeleteIngredient = (i) => {
        const copyIngredient = [...state.ingredients];
        copyIngredient.splice(i, 1);
        setStateField('ingredients', copyIngredient);
    };

    const handleInstructionChange = (e, i) => {
        const newInstructions = [...state.instructions];
        newInstructions[i].instructionText = e.target.value;
        setStateField("instructions", newInstructions);
    };

    const handleAddInstruction = () => {
        const newId = Math.max(...state.instructions.map((instruction) => instruction.id)) + 1;
        const newInstructions = [...state.instructions, {
            id: newId,
            instructionText: ""
        }];
        setStateField('instructions', newInstructions);
        setTimeout(() => {
            lastInstructionInputRef.current.focus();
        }, 0);
    };

    const handleDeleteInstruction = (i) => {
        const copyInstructions = [...state.instructions];
        copyInstructions.splice(i, 1);
        setStateField('instructions', copyInstructions);
    };

    const isAddIngredientButtonDisabled = state.ingredients.some((ingredient) => {
        return ingredient.ingredient.trim() === '';
    });

    const isAddInstructionButtonDisabled = state.instructions.some((instruction) => {
        return instruction.instructionText.trim() === '';
    });

    const isSubmitButtonDisabled = state.title.trim() === '' || state.imageURL.trim() === '' || state.servings === 0 || state.timeToMake === 0 || isAddIngredientButtonDisabled || isAddInstructionButtonDisabled || loadingRecipe;

    const shouldShowIngredientDeleteButton = state.ingredients.length > 1;
    const shouldShowInstructionsDeleteButton = state.instructions.length > 1;

    const handleKeypressOnIngredients = (e, i) => {
        if (isAddIngredientButtonDisabled) {
            return;
        }
        if (e.key === 'Enter') {
            handleAddIngredient();
        }
    };

    const handleKeypressOnInstructions = (e, i) => {
        if (isAddInstructionButtonDisabled) {
            return;
        }
        if (e.key === 'Enter') {
            handleAddInstruction();
        }
    };

    const handleResetAddForm = () => {
        setState(createState());
    }

    return (
        <div className='new-recipe-display'>
            <CopyRecipe state={state} setState={setState} loadingRecipe={loadingRecipe} setLoadingRecipe={setLoadingRecipe} />
            <div className='center-box'>
                <div className='center-line'></div>
            </div>
            <form className='form-div' onSubmit={(e) => e.preventDefault()}>
                <h4>From Scratch:</h4>
                <div className='double-form'>
                    <div className='form-input'>
                        <label htmlFor='recipeTitle'>Title of your Recipe</label>
                        <input type="text" placeholder='Recipe Name' name="title" value={state.title} onChange={handleNameChange} />
                    </div>
                    <div className='form-input'>
                        <label htmlFor='imageURL'>Paste the image URL</label>
                        <input type="text" placeholder='Image URL' name="imageURL" value={state.imageURL} onChange={handleImageURLChange} />
                    </div>
                </div>
                <div className='double-form'>
                    <div className='form-input'>
                        <label htmlFor='servings'>Servings</label>
                        <input type="number" placeholder='Servings' name="servings" value={state.servings} onChange={handleServingsChange} />
                    </div>
                    <div className='form-input'>
                        <label htmlFor='timeToMake'>Time to make (minutes)</label>
                        <input type="number" placeholder='Time to make' name="timeToMake" value={state.timeToMake} onChange={handleTimeToMakeChange} />
                    </div>
                </div>
                <div className='double-form'>
                    <div className='form-input'>
                        <label htmlFor='ingredient'>Ingredient</label>
                        {state.ingredients.map((ingredient, i) => {
                            return (
                                <div key={ingredient.id} className='can-delete'>
                                    <input
                                        type="text"
                                        className='long'
                                        placeholder='Quantity and Ingredient'
                                        name="ingredient"
                                        value={ingredient.ingredient}
                                        ref={i === state.ingredients.length - 1 ? lastIngredientInputRef : null}
                                        onKeyPress={(e) => handleKeypressOnIngredients(e, i)}
                                        onChange={(e) => handleIngredientChange(e, i)} />
                                    {shouldShowIngredientDeleteButton && <button type='button' className='form-field-delete' onClick={() => handleDeleteIngredient(i)}>X</button>}
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className='add-button-div'>
                    <button disabled={isAddIngredientButtonDisabled} type="button" className='add-button' onClick={handleAddIngredient}>Add ingredient</button>
                </div>
                <div className='form-input'>
                    <label htmlFor='instruction'>Instruction</label>
                    {state.instructions.map((instruction, i) => {
                        return (
                            <div key={instruction.id} className='can-delete'>
                                <input
                                    type="text"
                                    className='long'
                                    placeholder='Instruction'
                                    name="instruction"
                                    value={instruction.instructionText}
                                    ref={i === state.instructions.length - 1 ? lastInstructionInputRef : null}
                                    onKeyPress={(e) => handleKeypressOnInstructions(e, i)}
                                    onChange={(e) => handleInstructionChange(e, i)}
                                />
                                {shouldShowInstructionsDeleteButton && <button type='button' className='form-field-delete' onClick={() => handleDeleteInstruction(i)}>X</button>}
                            </div>
                        );
                    })}
                </div>
                <div className='add-button-div'>
                    <button disabled={isAddInstructionButtonDisabled} type='button' className='add-button' onClick={handleAddInstruction}>Add instruction</button>
                </div>
                <div className='form-submit'>
                    <button type='button' className='modal-cancel-button' disabled={loadingRecipe} onClick={handleResetAddForm}>Reset</button>
                    <button type="button" disabled={isSubmitButtonDisabled} className='modal-confirm-button' onClick={postAddRecipeForm}>Submit</button>
                </div>
            </form >
        </div>
    )
}

export default AddRecipe;
