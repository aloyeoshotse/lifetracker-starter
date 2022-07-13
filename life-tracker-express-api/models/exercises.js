import db from '../db.js'

export class Exercises {
    
    static async listUserExerciseEntries(user) {
        //lists all of the user's entered exercise entries from database
        const results = await db.query(
            `
             SELECT * FROM exercises
             WHERE username = (SELECT username FROM users WHERE email = $1);
            `, [user.email]
        );

        return results.rows;
    }

    static async createUserExerciseEntry(user) {
        //creates an entry in database for the user
        const userEmail = user.user.email
        const exercise = user.exercise
        /*format = 
            {
                "name" : "jump-rope",
                "category" : "cardio",
                "duration" : 10,
                "intensity" : 4
            }
        */

        await db.query(
            `
            INSERT INTO exercises (username, name, category, duration, intensity)
            VALUES ((SELECT username FROM users WHERE email = $1), $2, $3, $4, $5);
        `, [userEmail, exercise.name, exercise.category, exercise.duration, exercise.intensity]
    );
    }
}