import {UnauthorizedError, BadRequestError} from '../utils/errors.js'
import bcrypt from 'bcrypt';
import db from '../db.js'

export class User {

    static async makePublicUser(user) {
        return {
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            userName: user.username,
            createdAt: user.created_at
        }
    }

    static async fetchUserByEmail(email) {
        if (!email) {
            throw new BadRequestError('No email provided.')
        }

        const query = `SELECT * FROM users WHERE email = $1`

        const result = await db.query(query, [email.toLowerCase()])

        const user = result.rows[0]

        return user
    }

    static async fetchUserByUsername(username) {
        if (!username) {
            throw new BadRequestError('No username provided.')
        }

        const query = `SELECT * FROM users WHERE username = $1`

        const result = await db.query(query, [username])

        const user = result.rows[0]

        return user
    }


    static async register(credentials) {
        /* user should submit their first name, last name, email, username, and password
           if any of these fields are missing, throw an error */
        const requiredFields = ['firstName', 'lastName', 'email', 'userName', 'password']
        requiredFields.forEach(field => {
            if (!credentials.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing ${field} in request body.`);
            }
        })

        if (credentials.email.indexOf("@") <= 0) {
            throw new BadRequestError("Invalid email.")
        }
           
        /* make sure no user already exists in the system with that email
           if one does, throw an error */
        const existingUser = await User.fetchUserByEmail(credentials.email)
        if (existingUser) {
            throw new BadRequestError(`Duplicate email: ${credentials.email}. Please proceed to login page.`)
        }

        /*take the user's password, and hash it
           take the user's email, and lowercase it */
        const hashedPassword = await bcrypt.hash(credentials.password, 10)
        const lowercasedEmail = credentials.email.toLowerCase();

        /* create a new user in the database with all their info
           return the user
            */
        const result = await db.query(`
        INSERT INTO users (
            first_name,
            last_name,
            email,
            username,
            password
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, first_name, last_name, email, username, password, created_at;
        `, [credentials.firstName, credentials.lastName,lowercasedEmail, credentials.userName, hashedPassword])

        const user = result.rows[0]

        return User.makePublicUser(user);
    }


    static async login(credentials) {
        //user should submit their email and password
        //if any of these fields are missing, throw an error
        const requiredFields = ['email', 'password'];
        requiredFields.forEach(field => {
            if (!credentials.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing ${field} in request body.`);
            }
        })
        // lookup the user in the db by email
        const user = await User.fetchUserByEmail(credentials.email)
        // if a user is found, compare the submitted password
        // with the password in the db
        // if there is a match, return the user
        if (user) {
            const isValid = await bcrypt.compare(credentials.password, user.password)
            if (isValid) {
                return User.makePublicUser(user)
            }
        }
        // if any of this goes wrong, throw an error
        throw new UnauthorizedError('Invalid email/password combo')
    }
    

    static async getUserExerciseData(user) {
        
        const results = await db.query(
            `
            SELECT SUM(duration) AS "totalDuration"
            FROM exercises
            WHERE username = (SELECT username FROM users WHERE email = $1)
            `, [user.email]
        )
        return results.rows[0]
    }


    static async getUserNutritionData(user) {
    
        const results = await db.query(
            `
            SELECT AVG(calories) AS "avgCalories" 
            FROM nutrition 
            WHERE username = (SELECT username FROM users WHERE email = $1);
            `, [user.email]
        )
        return results.rows[0]
    }


    static async calculateSleepTimeInHours(sleepobject) {

        let totalTimeInHours = 0;

        for (var prop in sleepobject) {
            let value = sleepobject[prop];

            if (typeof value == "number") {
                if (prop == "years") {totalTimeInHours += (8760*value)}
                else if (prop == "months") {totalTimeInHours += (730*value)}
                else if (prop == "days") {totalTimeInHours += (24*value)}
                else if (prop == "hours") {totalTimeInHours += value}
                else if (prop == "minutes") { totalTimeInHours += (value/60)}
                else {totalTimeInHours += (value/3600)}
            }
        }

        return {avgSleepTime: totalTimeInHours.toFixed(2)}

    }


    static async getUserSleepData(user) {
    
        const results = await db.query(
            `
            SELECT AVG(end_time - start_time) AS "avgSleepTime" 
            FROM sleep 
            WHERE username = (SELECT username FROM users WHERE email = $1);
            `, [user.email]
        )

        return this.calculateSleepTimeInHours(results.rows[0].avgSleepTime)

    }

}
