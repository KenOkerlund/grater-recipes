import './EditModal.css'

import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';


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
    }, []);


    const putEditRecipeForm = (evt) => {
        axios.put(`http://localhost:5432/recipe/edit`, { body: state })
            .then(res => {
                console.log(res)
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
        console.log(newId);
        setStateField('ingredients', newIngredients);
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

    return (
        <div className='modal-backdrop' onClick={handleBackdropClick}>
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
                                <div key={i} className='can-delete'>
                                    <input type="text" className='long' placeholder='Measurement and Ingredient' name="ingredient" value={ingredient.ingredient} onChange={(e) => handleIngredientChange(e, i)} />
                                    {shouldShowIngredientDeleteButton && <button type='button' className='form-field-delete' onClick={() => handleDeleteIngredient(i)}>X</button>}
                                </div>
                            )
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
                            <div key={instruction.id} className='can-delete'>
                                <input type="text" className='long' placeholder='Instruction' name="instruction" value={instruction.instructionText} onChange={(e) => handleInstructionChange(e, i)} />
                                {shouldShowInstructionsDeleteButton && <button type='button' className='form-field-delete' onClick={() => handleDeleteInstruction(i)}>X</button>}
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
