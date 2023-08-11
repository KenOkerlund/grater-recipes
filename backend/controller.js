require('dotenv').config();
const {CONNECTION_STRING} = process.env;
const { getValue } = require('@testing-library/user-event/dist/utils');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('', {
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});

//Seed the database
const seed = (req, res) => {
    sequelize.query(`
    drop table if exists ingredients;
    drop table if exists instructions;
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
        FOREIGN KEY (user_id) REFERENCES users(user_id)
    );

    create table ingredients (
        ingredient_id SERIAL PRIMARY KEY NOT NULL,
        recipe_id INT NOT NULL,
        ingredient_quantity VARCHAR NOT NULL,
        FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id)
    );

    create table instructions (
        instruction_id SERIAL PRIMARY KEY NOT NULL,
        recipe_id INT NOT NULL,
        step_number INT,
        instruction VARCHAR,
        FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id)
    );

        insert into users(username, password)
        VALUES
        ('SpicyCracka', 'KindKelsier10!');

        insert into recipes(user_id, recipe_name, recipe_image, time_to_make, servings)
        VALUES
        (1, 'Chocolate Chip Cookies', 'https://images.aws.nestle.recipes/original/5b069c3ed2feea79377014f6766fcd49_Original_NTH_Chocolate_Chip_Cookie.jpg', '10 Minutes', 36);

        insert into ingredients(recipe_id, ingredient_quantity)
        VALUES
        (1, '1 Cup Salted Butter'),
        (1, '1 Cup white sugar'),
        (1, '1 Cup packed brown sugar'),
        (1, '2 tsp vanilla extract'),
        (1, '2 Large Eggs'),
        (1, '3 Cups Flour'),
        (1, '1 tsp Baking Soda'),
        (1, '1/2 tsp Baking Powder'),
        (1, '1 tsp sea salt'),
        (1, '2 cups Chocolate Chips');

        insert into instructions(recipe_id, step_number, instruction)
        VALUES
        (1, 1, 'Preheat oven to 375 degrees F. Line a baking pan with parchment paper and set aside.'),
        (1, 2, 'In a separate bowl mix flour, baking soda, salt, baking powder. Set aside.'),
        (1, 3, 'Cream together butter and sugars until combined.'),
        (1, 4, 'Beat in eggs and vanilla until fluffy.'),
        (1, 5, 'Mix in the dry ingredients until combined.'),
        (1, 6, 'Add 12 oz package of chocolate chips and mix well.'),
        (1, 7, 'Roll 2-3 TBS (depending on how large you like your cookies) of dough at a time into balls and place them evenly spaced on your prepared cookie sheets.'),
        (1, 8, 'Bake in preheated oven for approximately 8-10 minutes. Take them out when they are just BARELY starting to turn brown.'),
        (1, 9, 'Let them sit on the baking pan for 2 minutes before removing to cooling rack.');
    `).then(() => {
        console.log('DB SEEDED!')
        res.sendStatus(200)
    }).catch(err => console.log('Error seeding the DB', err));
};

// This is to test queries in postman
function getTest(req, res) {
    sequelize.query(`SELECT * FROM instructions`)
    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log(err));
};

//get the recipe image and name (for the recipe card) that belong to the current user.
function getRecipeCard(req, res) {
    sequelize.query(`SELECT recipe_image, recipe_name
    FROM recipes
    WHERE user_id = 1;`)
    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log(err));
};




module.exports = {
    seed,
    getTest,
    getRecipeCard
}


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
