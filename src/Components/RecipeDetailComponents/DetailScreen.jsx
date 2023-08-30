import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DetailImage from './DetailImage';
import ConfirmModal from '../ElementComponents/ConfirmModal';
import AlterQuantity from './AlterQuantity';

import './DetailScreen.css'
import EditModal from '../ElementComponents/EditModal';

const DetailScreen = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [recipe, setRecipe] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isEditing, setIsEditing] = useState(false);


    useEffect(() => {
        axios.get(`http://localhost:5432/recipe/${id}`)
            .then(res => {
                setRecipe(res.data[0]);
                console.log(res.data[0]);
            }).finally(() => {
                setIsLoading(false);
            })
    }, [id]);

    const handleDelete = () => {
        axios.delete(`http://localhost:5432/recipe/${id}/delete`)
            .then(res => {
                console.log(res)
            }).finally(() => {
                navigate(`/`)
            })
    };

    const toggleIsDeleting = () => {
        setIsDeleting(!isDeleting);
    };

    const toggleIsEditing = () => {
        setIsEditing(!isEditing);
    };

    if (isLoading) {
        return <>Loading...</>;
    }

    return (
        <>
            {isDeleting && <ConfirmModal recipeTitle={recipe.recipe_name} onCancel={toggleIsDeleting} onDelete={handleDelete} />}
            {isEditing && <EditModal recipe={recipe} onCancel={toggleIsEditing} />}
            {!isLoading && <div className='recipe-display'>
                <div className='recipe-display-header'>
                    <div className='recipe-edit-delete'>
                        <button className='transparent' onClick={toggleIsEditing}>Edit</button>
                        <button className='transparent' onClick={toggleIsDeleting}>Delete</button>
                    </div>
                    <DetailImage recipe_image={recipe.recipe_image} />
                </div>
                <div className='recipe-display-body'>
                    <div className='recipe-left-side'>
                        <div className='recipe-left-header'>
                            <h1 className='recipe-card-title'>{recipe.recipe_name}</h1>
                            <div className='recipe-card-about'>
                                <p>{recipe.servings} servings</p>
                                <p>{recipe.time_to_make}</p>
                            </div>
                        </div>
                        <div className='recipe-card-quantity-ingredients'>
                            <div className='recipe-card-ingredients'>
                                <h2>INGREDIENTS</h2>
                                <AlterQuantity recipe={recipe}/>
                            </div>
                            <div>
                                {recipe.quantity_ingredient.map((ing, i) => {
                                    return <><li key={i}>{ing.quantity} {ing.ingredient}</li><br /></>
                                })}
                            </div>
                        </div>
                    </div>
                    <div className='recipe-right-side'>
                        <h1 className='recipe-card-directions'>Directions</h1>
                        <div>
                            {recipe.instruction.map((instr, i) => {
                                return <><p key={i}>{i + 1}{"."} {instr.instructionText} </p><br /></>
                            })}
                        </div>
                    </div>
                </div>

            </div >}
        </>
    )
}

export default DetailScreen;