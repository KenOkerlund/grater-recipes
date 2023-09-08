import './AddRecipe.css'
import axios from 'axios';
import { useState } from 'react';


const CopyRecipe = ({ setState, loadingRecipe, setLoadingRecipe }) => {

    const [url, setUrl] = useState('');
    const [recipeIdea, setRecipeIdea] = useState('');

    function handleCopyRecipeChange(e) {
        setUrl(e.target.value);
    };

    function handleCreateRecipeChange(e) {
        setRecipeIdea(e.target.value);
    };

    function postCopyRecipeForm() {
        setLoadingRecipe(true);
        axios.post('http://localhost:5432/add-recipe/copy-recipe', { body: url })
            .then(res => {
                setState(res.data);
                setUrl('');
                setLoadingRecipe(false)
            })
            .catch(err => console.log(err));
    };

    function postCreateRecipeForm() {
        setLoadingRecipe(true);
        axios.post('http://localhost:5432/add-recipe/create-recipe', { body: recipeIdea })
            .then(res => {
                setState(res.data);
                setRecipeIdea('');
                setLoadingRecipe(false)
            })
            .catch(err => console.log(err));
    };

    function handleSpicyButtonClick() {
        setLoadingRecipe(true);
        axios.post(`http://localhost:5432/add-recipe/spicy`)
            .then(res => {
                setState(res.data);
                setLoadingRecipe(false)
            })
            .catch(err => console.log(err));
    };

    const isCopyRecipeButtonDisabled = !url.includes('.') || loadingRecipe;
    const isCreateRecipeButtonDisabled = recipeIdea.trim() === '' || loadingRecipe;

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
                <button type='button' onClick={handleSpicyButtonClick} disabled={loadingRecipe} className='spicy-button'>I'm feeling SPICY!</button>
            </div>
        </div>
    )
}

export default CopyRecipe