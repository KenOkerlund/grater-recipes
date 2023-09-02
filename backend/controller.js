require("dotenv").config();
const { CONNECTION_STRING } = process.env;
const Sequelize = require("sequelize");

const sequelize = new Sequelize(`${CONNECTION_STRING}`, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

//Seed the database
const seed = (req, res) => {
  sequelize
    .query(
      `
    drop table if exists recipes;
    drop table if exists users;

    create table users (
        user_id SERIAL PRIMARY KEY NOT NULL,
        username VARCHAR NOT NULL,
        password VARCHAR NOT NULL
    );

    create table recipes (
        recipe_id SERIAL PRIMARY KEY NOT NULL,
        user_id INT NOT NULL,
        recipe_name VARCHAR NOT NULL,
        recipe_image VARCHAR NOT NULL,
        time_to_make VARCHAR,
        servings INT,
        quantity_ingredient JSON NOT NULL,
        instruction JSON NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(user_id)
    );

        insert into users(username, password)
        VALUES
        ('SpicyCracka', 'KindKelsier10!');

        insert into recipes(user_id, recipe_name, recipe_image, time_to_make, servings, quantity_ingredient, instruction)
        VALUES
        (1, 'Chocolate Chip Cookies', 'https://images.aws.nestle.recipes/original/5b069c3ed2feea79377014f6766fcd49_Original_NTH_Chocolate_Chip_Cookie.jpg', '10 Minutes', 36, '[
            {
                "id": "0",
                "ingredient": "1 Cup Salted Butter"
            },
            {
                "id": "1",
                "ingredient": "1 Cup White Sugar"
            },
            {
                "id": "2",
                "ingredient": "1 Cup packed Brown Sugar"
            },
            {
                "id": "3",
                "ingredient": "2 Tsp Vanilla Extract"
            },
            {
                "id": "4",
                "ingredient": "2 Large Eggs"
            },
            {
                "id": "5",
                "ingredient": "3 Cups Flour"
            },
            {
                "id": "6",
                "ingredient": "1 Tsp Baking Soda"
            },
            {
                "id": "7",
                "ingredient": "1/2 Tsp Baking Powder"
            },
            {
                "id": "8",
                "ingredient": "1 Tsp Sea Salt"
            },
            {
                "id": "9",
                "ingredient": "2 Cups Chocolate Chips"
            }
        ]', 
        '[{
          "id": "0",
          "instructionText": "Preheat oven to 375 degrees F. Line a baking pan with parchment paper and set aside."
        },
          {
            "id": "1",
            "instructionText": "In a separate bowl mix flour, baking soda, salt, baking powder. Set aside."
          },
          {
            "id": "2",
            "instructionText": "Cream together butter and sugars until combined."
          },
          {
            "id": "3",
            "instructionText": "Beat in eggs and vanilla until fluffy."
          },
          {
            "id": "4",
            "instructionText": "Mix in the dry ingredients until combined."
          },
          {
            "id": "5",
            "instructionText": "Add 12 oz package of chocolate chips and mix well."
          },
          {
            "id": "6",
            "instructionText": "Roll 2-3 TBS (depending on how large you like your cookies) of dough at a time into balls and place them evenly spaced on your prepared cookie sheets."
          },
          {
            "id": "7",
            "instructionText": "Bake in preheated oven for approximately 8-10 minutes. Take them out when they are just BARELY starting to turn brown."
          },
          {
            "id": "8",
            "instructionText": "Let them sit on the baking pan for 2 minutes before removing to cooling rack."
          }
        ]');
    `
    )
    .then(() => {
      console.log("DB SEEDED!");
      res.sendStatus(200);
    })
    .catch((err) => console.log("Error seeding the DB", err));
};

// This is to test queries in postman
function getTest(req, res) {
  sequelize
    .query(`SELECT * FROM recipes`)
    .then((dbRes) => res.status(200).send(dbRes[0]))
    .catch((err) => console.log(err));
}

//get the recipe image and name (for the recipe card) that belong to the current user.
function getRecipeCard(req, res) {
  sequelize
    .query(
      `SELECT recipe_id, recipe_image, recipe_name
    FROM recipes
    WHERE user_id = 1
    ORDER BY LOWER(recipe_name);`
    )
    .then((dbRes) => res.status(200).send(dbRes[0]))
    .catch((err) => console.log(err));
}

function getRecipeDetails(req, res) {
  const { id } = req.params;
  sequelize
    .query(`SELECT * FROM recipes WHERE recipe_id = '${id}'`)
    .then((dbRes) => res.status(200).send(dbRes[0]))
    .catch((err) => console.log(err));
}

function postRecipeForm(req, res) {
  const { body } = req.body;
  const quantity_ingredient = JSON.stringify(body.ingredients);
  const instructionText = JSON.stringify(body.instructions);
  sequelize
    .query(
      `INSERT INTO recipes (recipe_name, recipe_image, user_id, time_to_make, servings, quantity_ingredient, instruction)
        VALUES ('${body.title}', '${body.imageURL}', '1', '${body.timeToMake}', '${body.servings}', '${quantity_ingredient}', '${instructionText}')`
    )
    .then((dbRes) => res.status(200).send(dbRes[0]))
    .catch((err) => console.log(err));
}

function deleteRecipe(req, res) {
  const { id } = req.params;
  sequelize
    .query(
      `DELETE FROM recipes
    WHERE recipe_id = '${id}'`
    )
    .then((dbRes) => console.log(dbRes))
    .catch((err) => console.log(err));

  res.sendStatus(200);
}

function editRecipe(req, res) {
  const { body } = req.body;
  const quantity_ingredient = JSON.stringify(body.ingredients);
  const instructionText = JSON.stringify(body.instructions);
  sequelize
    .query(
      `UPDATE recipes
    SET recipe_name = '${body.title}', recipe_image = '${body.imageURL}', time_to_make = '${body.timeToMake}', servings = '${body.servings}', quantity_ingredient = '${quantity_ingredient}', instruction = '${instructionText}'
    WHERE recipe_id = '${body.id}';
    `
    )
    .then((dbRes) => console.log(dbRes))
    .catch((err) => console.log(err));

  res.sendStatus(200);
}

module.exports = {
  seed,
  getTest,
  getRecipeCard,
  getRecipeDetails,
  postRecipeForm,
  deleteRecipe,
  editRecipe,
};
