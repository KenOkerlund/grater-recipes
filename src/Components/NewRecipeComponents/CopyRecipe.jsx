import './AddRecipe.css'
import axios from 'axios';
import { useState } from 'react';

/**
 * @TODOs
 * Validate before sending to the BE that it is indeed a URL (don't allow the endpoint to be hit unless it is a valid url)
 */


const CopyRecipe = ({ setState }) => {

    const [url, setUrl] = useState('');
    const [recipeIdea, setRecipeIdea] = useState('');

    function handleCopyRecipeChange(e) {
        setUrl(e.target.value);
    };

    function handleCreateRecipeChange(e){
        setRecipeIdea(e.target.value);
    };

    function postCopyRecipeForm() {
        axios.post('http://localhost:5432/add-recipe/copy-recipe', { body: url })
            .then(res => {
                setState(res.data);
                setUrl('');
            })
            .catch(err => console.log(err));
    };

    function postCreateRecipeForm() {
        axios.post('http://localhost:5432/add-recipe/create-recipe', { body: recipeIdea })
        .then(res => {
            setState(res.data);
            setUrl('');
        })
        .catch(err => console.log(err));
};

    function handleSpicyButtonClick() {
        axios.post(`http://localhost:5432/add-recipe/spicy`)
        .then(res => {
            setState(res.data);
            setRecipeIdea('');
        })
        .catch(err => console.log(err));
    };

    const isCopyRecipeButtonDisabled = !url.includes('.');
    const isCreateRecipeButtonDisabled = recipeIdea.trim() === '';

    return (
        <div className='form-div' >
            <h4 className='premade'>Premade Recipes:</h4>
            <form className='form-input' onSubmit={(e) => e.preventDefault()}>
                <label htmlFor='copyRecipe'>Copy recipe from website</label>
                <input type="text" name="copyRecipe" className='long' placeholder='Paste recipe URL here' onChange={handleCopyRecipeChange} />
                <div className='copy-recipe-buttons'>
                    <button type='button' disabled={isCopyRecipeButtonDisabled} className='copy-submit-btn' onClick={postCopyRecipeForm}>Copy Recipe</button>
                </div>
            </form>
            <form className='form-input' onSubmit={(e) => e.preventDefault()}>
                <label htmlFor='copyRecipe'>Find recipe for me</label>
                <input type="text" name="copyRecipe" className='long' placeholder='What recipe do you want to try?' onChange={handleCreateRecipeChange} />
                <div className='copy-recipe-buttons'>
                    <button type='button' disabled={isCreateRecipeButtonDisabled} className='copy-submit-btn' onClick={postCreateRecipeForm}>Create Recipe</button>
                </div>
            </form>
            <div className='spicy-div'>
                <button type='button' onClick={handleSpicyButtonClick} className='spicy-button'>I'm feeling SPICY!</button>
            </div>
        </div>
    )
}

export default CopyRecipe