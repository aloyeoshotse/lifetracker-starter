import db from '../db.js'

export class Nutrition {

    static async listUserNutritionEntries(user) {
        //returns all nutrition entries the user has created
        const results = await db.query(
            `
             SELECT * FROM nutrition
             WHERE username = (SELECT username FROM users WHERE email = $1);
            `, [user.email]
        );
        
        return results.rows;
    }

    static async createUserNutritionEntry(user) {
        //takes the user's nutrition entry and stores it in the database
        const userEmail = user.user.email
        const nutrition = user.nutrition
        /*format = 
            {
                "name" : "apple",
                "category" : "fruits",
                "quantity" : 2,
                "calories" : 30,
                "imageUrl" : "image.com"
            }
        */

        await db.query(
            `
                INSERT INTO nutrition (username, name, category, quantity, calories, image_url)
                VALUES ((SELECT username FROM users WHERE email = $1), $2, $3, $4, $5, $6);
            `, [userEmail, nutrition.name, nutrition.category, nutrition.quantity, nutrition.calories, nutrition.imageUrl ]
        );
    }

}