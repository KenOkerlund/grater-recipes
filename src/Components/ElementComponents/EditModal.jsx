import './EditModal.css'

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';


const EditModal = (props) => {
    const [state, setState] = useState({
        id: props.recipe.recipe_id,
        title: props.recipe.recipe_name,
        imageURL: props.recipe.recipe_image,
        servings: props.recipe.servings,
        timeToMake: props.recipe.time_to_make,
        ingredients: props.recipe.quantity_ingredient,
        instructions: props.recipe.instruction
    });

    const lastInstructionInputRef = useRef();
    const lastIngredientInputRef = useRef();

    const handleBackdropClick = (e) => {
        if (e.currentTarget === e.target) {
            props.onCancel();
        };
    };

    useEffect(() => {
        const listener = (evt) => {
            if (evt.key === "Escape") {
                props.onCancel();
            };
        };
        window.addEventListener('keydown', listener);

        return () => {
            window.removeEventListener('keydown', listener);
        }
    }, [props]);


    const putEditRecipeForm = () => {
        axios.put(`http://localhost:5432/recipe/edit`, { body: state })
            .then(res => {
                console.log(res)
                props.onCancel();
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
        const newInstructions = [...state.instructions, {
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
        return ingredient.quantity === '' || ingredient.quantity === 0 || ingredient.ingredient.trim() === '';
    });

    const isAddInstructionButtonDisabled = state.instructions.some((instruction) => {
        return instruction.instructionText.trim() === '';
    });

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

    return (
        <div className='modal-backdrop' onClick={handleBackdropClick}>
            <form className='edit-form-div' onSubmit={(e) => e.preventDefault()}>
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
                        <input type="number" placeholder='Servings' name="servings" value={state.servings} onChange={handleServingsChange} />
                    </div>
                    <div className='form-input'>
                        <label htmlFor='timeToMake'>Time to make (minutes)</label>
                        <input type="number" placeholder='Time to make' name="timeToMake" value={state.timeToMake} onChange={handleTimeToMakeChange} />
                    </div>
                </div>
                <div className='text-form-input'>
                    <label htmlFor='ingredient'>Ingredient</label>
                    {state.ingredients.map((ingredient, i) => {
                        return (
                            <div key={i} className='can-delete'>
                                <input
                                    type="text"
                                    className='long'
                                    placeholder='Measurement and Ingredient'
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
                <div className='add-button-div'>
                    <button disabled={isAddIngredientButtonDisabled} type="button" className='add-button' onClick={handleAddIngredient}>Add ingredient</button>
                </div>
                <div className='text-form-input'>
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
                                    onChange={(e) => handleInstructionChange(e, i)} />
                                {shouldShowInstructionsDeleteButton && <button type='button' className='form-field-delete' onClick={() => handleDeleteInstruction(i)}>X</button>}
                            </div>
                        );
                    })}
                </div>
                <div className='add-button-div'>
                    <button disabled={isAddInstructionButtonDisabled} type='button' className='add-button' onClick={handleAddInstruction}>Add instruction</button>
                </div>
                <div className='edit-form-submit'>
                    <button type='button' className='modal-cancel-button' onClick={props.onCancel}>Cancel</button>
                    <button type='submit' className='modal-confirm-button' onClick={putEditRecipeForm}>Save</button>
                </div>
            </form >
        </div>
    )
}

export default EditModal;
