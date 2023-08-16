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
                setIsLoading(false)
            })
    }, []);
    // id may need to be a dependency if recipes will be changed before the component is unmounted

    // if (isLoading) {
    //     return <>Loading!...</>;
    // }
    
    return (
        <section>
            <DetailImage recipe_image={recipe.recipe_image}/>
            {!isLoading && recipe.instruction.map((instr, i) => {
                return <li key={i}>{instr.instructionText}</li>
            })}
        </section>
    )
}

export default DetailScreen;