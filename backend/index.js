require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { PORT } = process.env;

const { seed, getTest, getRecipeCard, getRecipeDetails, postRecipeForm, deleteRecipe, editRecipe, copyRecipe } = require('./controller');

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
app.post('/add-recipe/copy-recipe', copyRecipe)

//delete the individual recipe based on parameter
app.delete('/recipe/:id/delete', deleteRecipe)

app.put('/recipe/edit', editRecipe)




app.listen(5432, () => console.log(`Database sync successful and server is running on 5432`));