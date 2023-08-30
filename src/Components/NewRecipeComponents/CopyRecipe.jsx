import './AddRecipe.css'

const CopyRecipe = ({ state, setState }) => {
    return (
        <form className='form-div'>
            <h4 className='premade'>Premade Recipes:</h4>
            <div className='form-input'>
                <label htmlFor='copyRecipe'>Paste Recipe Site URL</label>
                <input type="text" name="copyRecipe" className='long' placeholder='Paste recipe URL here' />
            </div>
            <div className='form-submit'>
                <button type='submit' className='copy-submit-btn'>Submit</button>
            </div>
        </form>
    )
}

export default CopyRecipe