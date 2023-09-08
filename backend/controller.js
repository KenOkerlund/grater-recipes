const axios = require('axios')

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

//get the information about a specific recipe
function getRecipeDetails(req, res) {
  const { id } = req.params;
  sequelize
    .query(`SELECT * FROM recipes WHERE recipe_id = '${id}'`)
    .then((dbRes) => res.status(200).send(dbRes[0]))
    .catch((err) => console.log(err));
}

//Add a new recipe from the form
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

//delete a recipe
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

//edit a currently existing recipe
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

//copy a recipe and present it ready for postRecipeForm
function copyRecipe(req, res) {
  const { body } = req.body;
  const { RAPID_API_KEY } = process.env;

  const apiChatBody = `You are allowed to access websites and scrape their data. Now, get me the following information from the website ${body} in the form of a valid JSON object.
  That means there should be no new lines in your reply, and all keys and values should have double quotes, and whatever else is required to make a valid JSON response.
  The recipe name (title), the image url of the picture of the recipe which needs to be the full url of the image address and I do not need the actual image I just need the URL to its path, the time it takes to make (in minutes only, do not include the word minutes), the servings (number only, do not include the word servings), the quantity and ingredients(all of them, even if they are for seperate purposes within the recipe), and the instructions.
  It is important that the quantity-ingredient object has an array of objects with a unique id that increments by 1 for each ingredient object.
  It is also important that the instructions object has an array of objects where each instruction step is a new object.
  Do not number these steps, just get the text of the instruction.
  Each object must have the unique id that increments by 1 for each instruction object.
  Here is an example of what I am looking for:
  {"title": "The name of the recipe", "imageURL": "The image of the recipe", "timeToMake": "The time it takes to make", "servings": "The amount of servings", "ingredients": [{"id": "1", "ingredient": "1 Cup of flour"}, {"id": "2", "ingredient": "1/2 TSP of baking soda"}], "instructions": [{"id": "1", "instructionText": "The first instruction"}, {"id": "2", "instructionText": "The second instruction"}]}
  Reply only with the valid JSON object.
  `;

  const options = {
    method: 'POST',
    url: 'https://open-ai21.p.rapidapi.com/conversationgpt',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': RAPID_API_KEY,
      'X-RapidAPI-Host': 'open-ai21.p.rapidapi.com'
    },
    data: {
      messages: [
        {
          role: 'user',
          content: apiChatBody,
        }
      ]
    }
  };

  axios.request(options)
    .then((response) => {
      console.log(response.data)
      res.status(200).send(JSON.parse(response.data.GPT))
    })
    .catch((error) => {
      console.error(error)
      res.status(424).send('Figure it out yourself :D');
    });

  // const dataFromEndpoint = {
  //   GPT: '"{\\"title\\": \\"Pumpkin Cinnamon Rolls\\", \\"imageURL\\": \\"https://marshasbakingaddiction.com/wp-content/uploads/2020/09/Pumpkin-Cinnamon-Rolls-7.jpg\\", \\"timeToMake\\": \\"120\\", \\"servings\\": \\"12\\", \\"ingredients\\": [{\\"id\\": \\"1\\", \\"ingredient\\": \\"3 and 1/4 cups (405g) plain/all-purpose flour\\"}, {\\"id\\": \\"2\\", \\"ingredient\\": \\"2 and 1/4 teaspoons Instant yeast\\"}, {\\"id\\": \\"3\\", \\"ingredient\\": \\"2 tablespoons (30g) granulated sugar\\"}, {\\"id\\": \\"4\\", \\"ingredient\\": \\"1/2 teaspoon salt\\"}, {\\"id\\": \\"5\\", \\"ingredient\\": \\"1/2 teaspoon ground cinnamon\\"}, {\\"id\\": \\"6\\", \\"ingredient\\": \\"1/4 teaspoon ground nutmeg\\"}, {\\"id\\": \\"7\\", \\"ingredient\\": \\"1/4 teaspoon ground ginger\\"}, {\\"id\\": \\"8\\", \\"ingredient\\": \\"1/4 teaspoon ground cloves\\"}, {\\"id\\": \\"9\\", \\"ingredient\\": \\"120 ml (1/2 cup) lukewarm water\\"}, {\\"id\\": \\"10\\", \\"ingredient\\": \\"60 ml (1/4 cup) lukewarm milk\\"}, {\\"id\\": \\"11\\", \\"ingredient\\": \\"120 ml (1/2 cup) unsweetened pumpkin puree\\"}, {\\"id\\": \\"12\\", \\"ingredient\\": \\"60g (1/4 cup) unsalted butter, melted\\"}, {\\"id\\": \\"13\\", \\"ingredient\\": \\"1 large egg\\"}, {\\"id\\": \\"14\\", \\"ingredient\\": \\"1 teaspoon vanilla extract\\"}, {\\"id\\": \\"15\\", \\"ingredient\\": \\"For the Filling:\\"}, {\\"id\\": \\"16\\", \\"ingredient\\": \\"100g (1/2 cup) light brown sugar\\"}, {\\"id\\": \\"17\\", \\"ingredient\\": \\"1 and 1/2 teaspoons ground cinnamon\\"}, {\\"id\\": \\"18\\", \\"ingredient\\": \\"60g (1/4 cup) unsalted butter, softened\\"}, {\\"id\\": \\"19\\", \\"ingredient\\": \\"For the Cream Cheese Frosting:\\"}, {\\"id\\": \\"20\\", \\"ingredient\\": \\"100g (1/2 cup) cream cheese, softened\\"}, {\\"id\\": \\"21\\", \\"ingredient\\": \\"60g (1/4 cup) unsalted butter, softened\\"}, {\\"id\\": \\"22\\", \\"ingredient\\": \\"150g (1 and 1/4 cups) icing/powdered sugar\\"}, {\\"id\\": \\"23\\", \\"ingredient\\": \\"1 teaspoon vanilla extract\\"}, {\\"id\\": \\"24\\", \\"ingredient\\": \\"1 - 2 tablespoons milk\\"}], \\"instructions\\": [{\\"id\\": \\"1\\", \\"instructionText\\": \\"In a large mixing bowl, mix together the flour, yeast, sugar, salt, cinnamon, nutmeg, ginger, and cloves.\\"}, {\\"id\\": \\"2\\", \\"instructionText\\": \\"Make a well in the centre and add the water, milk, pumpkin puree, melted butter, egg, and vanilla extract. Mix together until a dough forms. Knead for about 5 minutes until the dough is smooth and elastic.\\"}, {\\"id\\": \\"3\\", \\"instructionText\\": \\"Place the dough into a lightly oiled bowl, cover with clingfilm and leave to rise in a warm place for 1 hour, or until doubled in size.\\"}, {\\"id\\": \\"4\\", \\"instructionText\\": \\"Once doubled in size, punch down the dough to release any air bubbles.\\"}, {\\"id\\": \\"5\\", \\"instructionText\\": \\"On a lightly floured surface, roll out the dough into a 35x45cm rectangle.\\"}, {\\"id\\": \\"6\\", \\"instructionText\\": \\"For the filling, spread the softened butter evenly over the surface of the dough.\\"}, {\\"id\\": \\"7\\", \\"instructionText\\": \\"In a separate bowl, mix together the brown sugar and cinnamon. Sprinkle evenly over the buttered dough.\\"}, {\\"id\\": \\"8\\", \\"instructionText\\": \\"Starting from one of the longer edges, tightly roll up the dough into a log shape.\\"}, {\\"id\\": \\"9\\", \\"instructionText\\": \\"Using a sharp knife, slice the log into 12 equal rolls. Place the rolls into a greased 9x13 inch baking dish. Cover with clingfilm and leave to rise in a warm place for a further 30 minutes.\\"}, {\\"id\\": \\"10\\", \\"instructionText\\": \\"Preheat the oven to 180C/350F/Gas 4.\\"}, {\\"id\\": \\"11\\", \\"instructionText\\": \\"Bake the cinnamon rolls for 20-25 minutes until golden brown and cooked through.\\"}, {\\"id\\": \\"12\\", \\"instructionText\\": \\"Remove from the oven and leave to cool slightly in the baking dish.\\"}, {\\"id\\": \\"13\\", \\"instructionText\\": \\"While the rolls are cooling, make the cream cheese frosting. In a mixing bowl, beat together the cream cheese and butter until creamy.\\"}, {\\"id\\": \\"14\\", \\"instructionText\\": \\"Gradually add the icing sugar and vanilla extract, beating until smooth and creamy.\\"}, {\\"id\\": \\"15\\", \\"instructionText\\": \\"If the frosting is too thick, add a little milk to thin it out. If the frosting is too thin, add a little more icing sugar.\\"}, {\\"id\\": \\"16\\", \\"instructionText\\": \\"Spread the cream cheese frosting over the slightly cooled cinnamon rolls.\\"}]}"'
  // }

  // res.status(200).send(JSON.parse(dataFromEndpoint.GPT));
}

//get a recipe with a certain title and present it ready for postRecipeForm
function createRecipe(req, res) {
  const { body } = req.body;
  const { RAPID_API_KEY } = process.env;

  const apiChatBody = `You are allowed to access websites and scrape their data. Now, find me a recipe online where the title includes the words ${body} and present it the form of a valid JSON object.
  That means there should be no new lines in your reply, and all keys and values should have double quotes, and whatever else is required to make a valid JSON response.
  The recipe name (title), the image url of the picture of the recipe which needs to be the full url of the image address and I do not need the actual image I just need the URL to its path, the time it takes to make (in minutes only, do not include the word minutes), the servings (number only, do not include the word servings), the quantity and ingredients(all of them, even if they are for seperate purposes within the recipe), and the instructions.
  It is important that the quantity-ingredient object has an array of objects with a unique id that increments by 1 for each ingredient object.
  It is also important that the instructions object has an array of objects where each instruction step is a new object.
  Do not number these steps, just get the text of the instruction.
  Each object must have the unique id that increments by 1 for each instruction object.
  Here is an example of what I am looking for:
  {"title": "The name of the recipe", "imageURL": "The image of the recipe", "timeToMake": "The time it takes to make", "servings": "The amount of servings", "ingredients": [{"id": "1", "ingredient": "1 Cup of flour"}, {"id": "2", "ingredient": "1/2 TSP of baking soda"}], "instructions": [{"id": "1", "instructionText": "The first instruction"}, {"id": "2", "instructionText": "The second instruction"}]}
  Reply only with the valid JSON object.
  `;

  const options = {
    method: 'POST',
    url: 'https://open-ai21.p.rapidapi.com/conversationgpt',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': RAPID_API_KEY,
      'X-RapidAPI-Host': 'open-ai21.p.rapidapi.com'
    },
    data: {
      messages: [
        {
          role: 'user',
          content: apiChatBody,
        }
      ]
    }
  };

  axios.request(options)
    .then((response) => {
      console.log(response.data)
      res.status(200).send(JSON.parse(response.data.GPT))
    })
    .catch((error) => {
      console.error(error)
      res.status(424).send('Figure it out yourself :D');
    });
};

//purely random recipe
function spicyRecipe(req, res) {
  const { RAPID_API_KEY } = process.env;

  const apiChatBody = `You are allowed to access websites and scrape their data. Now, I want to try out a new recipe but don't know what to try. So, I need you to find me a random recipe online and present it the form of a valid JSON object.
  That means there should be no new lines in your reply, and all keys and values should have double quotes, and whatever else is required to make a valid JSON response.
  The recipe name (title), the image url of the picture of the recipe which needs to be the full url of the image address and I do not need the actual image I just need the URL to its path, the time it takes to make (in minutes only, do not include the word minutes), the servings (number only, do not include the word servings), the quantity and ingredients(all of them, even if they are for seperate purposes within the recipe), and the instructions.
  It is important that the quantity-ingredient object has an array of objects with a unique id that increments by 1 for each ingredient object.
  It is also important that the instructions object has an array of objects where each instruction step is a new object.
  Do not number these steps, just get the text of the instruction.
  Each object must have the unique id that increments by 1 for each instruction object.
  Here is an example of what I am looking for:
  {"title": "The name of the recipe", "imageURL": "The image of the recipe", "timeToMake": "The time it takes to make", "servings": "The amount of servings", "ingredients": [{"id": "1", "ingredient": "1 Cup of flour"}, {"id": "2", "ingredient": "1/2 TSP of baking soda"}], "instructions": [{"id": "1", "instructionText": "The first instruction"}, {"id": "2", "instructionText": "The second instruction"}]}
  Reply only with the valid JSON object.
  `;

  const options = {
    method: 'POST',
    url: 'https://open-ai21.p.rapidapi.com/conversationgpt',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': RAPID_API_KEY,
      'X-RapidAPI-Host': 'open-ai21.p.rapidapi.com'
    },
    data: {
      messages: [
        {
          role: 'user',
          content: apiChatBody,
        }
      ]
    }
  };

  axios.request(options)
    .then((response) => {
      console.log(response.data)
      res.status(200).send(JSON.parse(response.data.GPT))
    })
    .catch((error) => {
      console.error(error)
      res.status(424).send('Figure it out yourself :D');
    });
};


module.exports = {
  seed,
  getTest,
  getRecipeCard,
  getRecipeDetails,
  postRecipeForm,
  deleteRecipe,
  editRecipe,
  copyRecipe,
  createRecipe,
  spicyRecipe,
};
