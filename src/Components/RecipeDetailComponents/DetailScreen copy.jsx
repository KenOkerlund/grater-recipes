import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DetailImage from './DetailImage';

import './DetailScreen.css'

const DetailScreen = () => {
    const { id } = useParams();

    const [recipe, setRecipe] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:5432/recipe/${id}`)
            .then(res => {
                setRecipe(res.data[0]);
                console.log(res.data[0]);
            }).finally(() => {
                setIsLoading(false);
            })
    }, [id]);
    // id may need to be a dependency if recipes will be changed before the component is unmounted


    if (isLoading) {
        return <>Loading...</>;
    }

    return (
        !isLoading && <div className='recipe-display'>
            <div className='recipe-display-header'>
                <DetailImage recipe_image={recipe.recipe_image} />
                <h4>{recipe.recipe_name}</h4>
                <div className='recipe-alter-quantity'>
                    <button className='math-button'>1</button>
                    <button className='math-button'>2</button>
                    <button className='math-button'>3</button>
                </div>
            </div>
            <div className='recipe-info'>
                <h6 className="detail">Time: {recipe.time_to_make}</h6>
                <h6 className="detail">Servings: {recipe.servings}</h6>
            </div>
            <div className='recipe-content'>
                <div className='ingredients'>
                    <h2>Ingredients:</h2>
                    {recipe.quantity_ingredient.map((ing, i) => {
                        return <><li key={i}>{ing.quantity} {ing.ingredient}</li><br /></>
                    })}
                </div>
                <div className='instructions'>
                    <h2 className="detail">Instructions:</h2>
                    {recipe.instruction.map((instr, i) => {
                        return <><p key={i}>{i + 1}{"."} {instr.instructionText} </p><br /></>
                    })}
                </div>
            </div>
        </div >
    )
}

export default DetailScreen;