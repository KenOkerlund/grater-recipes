import React from 'react';

export function IngredientsForm() {
    const [ingredients, setIngredients] = useState([{
        quantity: 1,
        ingredient: 'The tasty goodness',
    }]);

	const [isLoading, setIsLoading] = useState(false);

	const updateQuantity = (i, newQuantity) => {
		const newState = [...ingredients];
		newState[i].quantity = newQuantity;
		setState(newState);
	};

	const updateIngredient = (i, newIngredient) => {
		const newState = [...ingredients];
		newState[i].ingredient = newIngredient;
		setState(newState);
	};

	const addBlankIngredient = () => {
		const newState = [...ingredients];
		newState.push({
			quantity: 0,
			ingredient: 'The tasty goodness',
		});
		setState(newState);
	}

	const submit = () => {
		// setIsLoading(true)
		// axios.post({updateIngredient})
		// .finally(() => setIsLoading(false))
	};

	const shouldAddButtonBeDisabled = ingredients[ingredients.length - 1].quantity = 0; //This would return bool - could add && if ingredient is empty or something

    return (
        <form>
            {ingredients.map((ingredient, i) => (
                <div key={i}>
					<input type="number" value={ingredient.quantity} onChange={(event) => updateQuantity(i, event.target.value)} />
					<input type="text" value={ingredient.ingredient} onChange={(event) => updateIngredient(i, event.target.value)} />
                </div>
            ))}
			<button onClick={addBlankIngredient} disabled={shouldAddButtonBeDisabled}>Add another ingredient</button>
			<button type='submit'>Make Yummy Text!</button>
        </form>
    );
}
