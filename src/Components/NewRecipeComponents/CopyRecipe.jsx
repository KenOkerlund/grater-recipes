import './AddRecipe.css'
import axios from 'axios';
import { useState } from 'react';

/**
 * @TODOs
 * Validate before sending to the BE that it is indeed a URL (don't allow the endpoint to be hit unless it is a valid url)
 */


const CopyRecipe = ({ state, setState }) => {

    const [url, setUrl] = useState('');

    function handleCopyRecipeChange(e) {
        setUrl(e.target.value);
    };

    function postCopyRecipeForm() {
        axios.post('http://localhost:5432/add-recipe/copy-recipe', { body: url })
            .then(res => {
                console.log(state);
                console.log(res.data);
                setState(res.data);
            })
            .catch(err => console.log(err));
    };

    return (
        <form className='form-div' onSubmit={(e) => e.preventDefault()}>
            <h4 className='premade'>Premade Recipes:</h4>
            <div className='form-input'>
                <label htmlFor='copyRecipe'>Paste Recipe Site URL</label>
                <input type="text" name="copyRecipe" className='long' placeholder='Paste recipe URL here' onChange={handleCopyRecipeChange} />
            </div>
            <div className='form-submit'>
                <button type='button' className='copy-submit-btn' onClick={postCopyRecipeForm}>Copy Recipe</button>
            </div>
        </form>
    )
}

export default CopyRecipe