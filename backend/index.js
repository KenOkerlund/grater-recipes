require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { PORT } = process.env;

const { seed, getTest, getRecipeCard, getRecipeDetails, postRecipeForm, deleteRecipe, editRecipe, copyRecipe, createRecipe, spicyRecipe } = require('./controller');

const app = express();

app.use(express.json());
app.use(cors());

//setting up the DB
app.post('/seed', seed);

//this is for testing purposes
app.get('/test', getTest);


//get all the recipes for the logged in user
app.get('/recipe-cards', getRecipeCard);
//get the individual recipe details for the card that was clicked
app.get('/recipe/:id', getRecipeDetails);

//post the form data to create a new recipe
app.post('/add-recipe/submit', postRecipeForm);
//autofill the form based on a website
app.post('/add-recipe/copy-recipe', copyRecipe);
//find a recipe that matches the title we sent in
app.post('/add-recipe/create-recipe', createRecipe)
//create a random recipe unknown to the user
app.post('/add-recipe/spicy', spicyRecipe);

//delete the individual recipe based on parameter
app.delete('/recipe/:id/delete', deleteRecipe)

app.put('/recipe/edit', editRecipe)




app.listen(5432, () => console.log(`Database sync successful and server is running on 5432`));