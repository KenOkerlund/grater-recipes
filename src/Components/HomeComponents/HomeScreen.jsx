import Banner from "./Banner";
import RecipeContainer from "./RecipeContainer";
import RecipeFilter from "./RecipeFilter";
import {useState} from 'react';

require('./HomeScreen.css');

const HomeScreen = () => {

    const [searchForRecipe, setSearchForRecipe] = useState('');

    return (
        <div className="home-screen">
            <Banner />
            <RecipeFilter search={searchForRecipe} setSearch={setSearchForRecipe}/>
            <RecipeContainer search={searchForRecipe} />
        </div>
    )
}

export default HomeScreen;