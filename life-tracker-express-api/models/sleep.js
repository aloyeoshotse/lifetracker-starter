import db from '../db.js'

export class Sleep {

    static async listUserSleepEntries(user) {
        //lists all of the user's entered sleep entries from database
        const results = await db.query(
            `
             SELECT * FROM sleep
             WHERE username = (SELECT username FROM users WHERE email = $1);
            `, [user.email]
        );

        return results.rows;
    }

    static async createUserSleepEntry(user) {
        //creates an entry in database for the user
        const userEmail = user.user.email
        const sleep = user.sleep
        /*format = 
            {
                "startTime" : "2022-07-13T05:56:39.268Z",
                "endTime" : "2022-07-13T07:56:39.268Z"
	
            }

            try to reformat the date
        */

        await db.query(
            `
            INSERT INTO sleep (username, start_time, end_time)
            VALUES ((SELECT username FROM users WHERE email = $1), $2, $3);
        `, [userEmail, sleep.startTime, sleep.endTime]
    );
    }
}