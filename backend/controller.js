require("dotenv").config();
const { CONNECTION_STRING } = process.env;
const { getValue } = require("@testing-library/user-event/dist/utils");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    `${CONNECTION_STRING}`,
    {
        dialect: "postgres",
        dialectOptions: {
            ssl: {
                rejectUnauthorized: false,
            },
        },
    }
);

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
                "quantity": "1",
                "ingredient": "Cup Salted Butter"
            },
            {
                "quantity": "1",
                "ingredient": "Cup White Sugar"
            },
            {
                "quantity": "1",
                "ingredient": "Cup packed Brown Sugar"
            },
            {
                "quantity": "2",
                "ingredient": "Tsp Vanilla Extract"
            },
            {
                "quantity": "2",
                "ingredient": "Large Eggs"
            },
            {
                "quantity": "3",
                "ingredient": "Cups Flour"
            },
            {
                "quantity": "1",
                "ingredient": "Tsp Baking Soda"
            },
            {
                "quantity": "1/2",
                "ingredient": "Tsp Baking Powder"
            },
            {
                "quantity": "1",
                "ingredient": "Tsp Sea Salt"
            },
            {
                "quantity": "2",
                "ingredient": "Cups Chocolate Chips"
            }
        ]', 
        '[{"instructionText": "Preheat oven to 375 degrees F. Line a baking pan with parchment paper and set aside."},{"instructionText": "In a separate bowl mix flour, baking soda, salt, baking powder. Set aside."},{"instructionText": "Cream together butter and sugars until combined."},{"instructionText": "Beat in eggs and vanilla until fluffy."},{"instructionText": "Mix in the dry ingredients until combined."},{"instructionText": "Add 12 oz package of chocolate chips and mix well."},{"instructionText": "Roll 2-3 TBS (depending on how large you like your cookies) of dough at a time into balls and place them evenly spaced on your prepared cookie sheets."},{"instructionText": "Bake in preheated oven for approximately 8-10 minutes. Take them out when they are just BARELY starting to turn brown."},{"instructionText": "Let them sit on the baking pan for 2 minutes before removing to cooling rack."}]');
    `)
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
};

//get the recipe image and name (for the recipe card) that belong to the current user.
function getRecipeCard(req, res) {
    sequelize
        .query(
            `SELECT recipe_id, recipe_image, recipe_name
    FROM recipes
    WHERE user_id = 1;`
        )
        .then((dbRes) => res.status(200).send(dbRes[0]))
        .catch((err) => console.log(err));
};

function getRecipeDetails(req, res) {
    const { id } = req.params;
    console.log(id)
    sequelize.query(
        `SELECT * FROM recipes WHERE recipe_id = '${id}'`
    ).then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err));
}

module.exports = {
    seed,
    getTest,
    getRecipeCard,
    getRecipeDetails,
};

// const instructions = ['1/2 cup butter', '3 handfulls of sugar (powdered)'];
// // ---
// // [1][cup of butter]
// // ---
// // [ + ]

// const payloadThatisGoinToTheBe = [
//     {
//         quantity: 1,
//         ingredient: 'cup of butter (Auntie Anns because is de best)',
//     },
//     {
//         quantity: 2,
//         ingredient: 'cups of water (room temp)',
//     }
// ];

// const BEGets = JSON.stringify(payloadThatisGoinToTheBe);

// const beforeGoingToFE = JSON.parse(stringStoredInDB);
