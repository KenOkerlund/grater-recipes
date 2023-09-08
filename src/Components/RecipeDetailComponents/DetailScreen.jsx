import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import DetailImage from './DetailImage';
import ConfirmModal from '../ElementComponents/ConfirmModal';

import './DetailScreen.css'
import EditModal from '../ElementComponents/EditModal';
import LoadingModal from '../ElementComponents/LoadingModal';

const DetailScreen = () => {
    const location = useLocation();
    const id = location.pathname.split('/')[2];
    // const { id } = useParams();
    const navigate = useNavigate();

    const [recipe, setRecipe] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const getRecipe = useCallback(() => {
        axios.get(`http://localhost:5432/recipe/${id}`)
            .then(res => {
                setRecipe(res.data[0]);
            }).finally(() => {
                setIsLoading(false);
            })
    }, [id]);

    useEffect(() => {
        getRecipe();
    }, [getRecipe, id]);

    const handleDelete = () => {
        axios.delete(`http://localhost:5432/recipe/${id}/delete`)
            .then(res => {
            }).finally(() => {
                navigate(`/`)
            })
    };
    
    const toggleIsDeleting = () => {
        setIsDeleting(!isDeleting);
    };

    const toggleIsEditing = () => {
        setIsEditing(!isEditing);
        getRecipe();
    };

    if (isLoading) {
        return <LoadingModal />;
    }

    return (
        <>
            {isDeleting && <ConfirmModal recipeTitle={recipe.recipe_name} onCancel={toggleIsDeleting} onDelete={handleDelete} />}
            {isEditing && <EditModal recipe={recipe} onCancel={toggleIsEditing} />}
            {!isLoading && <div className='recipe-display'>
                <div className='recipe-display-header'>
                    <div className='recipe-edit-delete'>
                        <button className='form-header-button' onClick={toggleIsEditing}>Edit</button>
                        <button className='form-header-button' onClick={toggleIsDeleting}>Delete</button>
                    </div>
                    <DetailImage recipe_image={recipe.recipe_image} />
                </div>
                <div className='recipe-display-body'>
                    <div className='recipe-left-side'>
                        <div className='recipe-left-header'>
                            <h1 className='recipe-card-title'>{recipe.recipe_name}</h1>
                            <div className='recipe-card-about'>
                                <p>{recipe.servings} servings</p>
                                <p>{recipe.time_to_make} minutes</p>
                            </div>
                        </div>
                        <div className='recipe-card-quantity-ingredients'>
                            <div className='recipe-card-ingredients'>
                                <h2>INGREDIENTS</h2>
                            </div>
                            <ul>
                                {recipe.quantity_ingredient.map((ingredient, i) => {
                                    return <li className='recipe-list' key={ingredient.id}>{ingredient.ingredient}</li>
                                })}
                            </ul>
                        </div>
                    </div>
                    <div className='recipe-right-side'>
                        <h2 className='recipe-card-directions'>DIRECTIONS</h2>
                        <ol>
                            {recipe.instruction.map((instruction, i) => {
                                return <li className='recipe-list' key={instruction.id}>{instruction.instructionText} </li>
                            })}
                        </ol>
                    </div>
                </div>

            </div >}
        </>
    )
}

export default DetailScreen;