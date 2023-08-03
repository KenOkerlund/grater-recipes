import './RecipeContainer.css'

import RecipeCard from './RecipeCard'

const dummy_data = [{ title: "Test1", text: "text1" }, { title: "Test2", text: 'text2' }];

const RecipeContainer = () => {
    const recipeCard = dummy_data.map((item) => {
        return (
            <RecipeCard recipe={item}/>
        )
    });


    return (
        <section className='recipe-section'>
            <div className="recipe-gallery">
                {recipeCard}
            </div>
        </section>
    )
}

export default RecipeContainer