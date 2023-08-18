import { Formik, Field, Form } from 'formik';

import './AddRecipe.css'

const AddRecipe = () => {

    const initialValues = {
        name: "",
        image: "",
        time: "",
        servings: "",
        quantity: [],
        ingredient: [],
        instruction: [],
    }

    const submitFormHandler = (values) => {
        
    }

    return (
        <div className='new-recipe-display'>
            <div className='copy-recipe'>
                <h4>For premade recipes:</h4>
                <input type="text" placeholder='copy the URL of a recipe site here.' />
            </div>
            <div className='new-recipe'>
                <h4>Make from scratch:</h4>
                <Formik
                    initialValues={initialValues} onSubmit={submitFormHandler}>
                    {({ values, handleChange, handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <div>
                                <input placeholder="Title of the Recipe"
                                    value={values.recipe_name}
                                    onChange={handleChange}
                                    name="recipe_name"
                                />
                                <input placeholder="Paste an Image URL"
                                    value={values.recipe_image}
                                    onChange={handleChange}
                                    name="recipe_image"
                                />
                                <input placeholder="Time it takes to make (minutes)"
                                    value={values.time_to_make}
                                    onChange={handleChange}
                                    name="time_to_make"
                                />
                                <input placeholder="Servings"
                                    value={values.servings}
                                    onChange={handleChange}
                                    name="servings"
                                />
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default AddRecipe;