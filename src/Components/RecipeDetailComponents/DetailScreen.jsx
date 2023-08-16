import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DetailImage from './DetailImage';

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
        !isLoading && <div>
            <div>
                <DetailImage recipe_image={recipe.recipe_image} />
                <h4>{recipe.recipe_name}</h4>
                <div>
                    <button className='math-button'>1</button>
                    <button className='math-button'>2</button>
                    <button className='math-button'>3</button>
                </div>
            </div>
            <div>
                <div className='ingredients'>
                    <h2>Ingredients:</h2>
                    {recipe.quantity_ingredient.map((ing, i) => {
                        return <li key={i}>{ing.quantity} {ing.ingredient}</li>
                    })}
                </div>
                <div className='instructions'>
                    <h2>Instructions:</h2>
                    {recipe.instruction.map((instr, i) => {
                        return <p key={i}>{i + 1}{"."} {instr.instructionText}</p>
                    })}
                </div>
            </div>
            <div>
                <h6>Time: {recipe.time_to_make}</h6>
                <h6>Servings: {recipe.servings}</h6>
            </div>
        </div>
    )
}

export default DetailScreen;