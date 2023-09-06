import './Banner.css'
import { useNavigate } from 'react-router'

const Banner = () => {
    const navigate = useNavigate();

    const handleAddRecipeButtonClick = () => {
        navigate(`/add-recipe`);
    }

    return <div className='banner-outer'>
        <div className='banner'></div>
        <div className='banner-overlay'>
            <div className='banner-content'>
                <h1>Family Favourite Recipes</h1>
                <h3>Easily find and create recipes that the whole family can enjoy</h3>
                <button onClick={handleAddRecipeButtonClick}>Add your next recipe</button>
            </div>
        </div>
    </div>
}

export default Banner;