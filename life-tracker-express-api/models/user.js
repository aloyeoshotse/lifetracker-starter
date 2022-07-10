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


    static async register(credentials) {
        /* user should submit their first name, last name, email, and password
           if any of these fields are missing, throw an error */
        const requiredFields = ['firstName', 'lastName', 'email', 'password']
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
            throw new BadRequestError(`Duplicate email: ${credentials.email}`)
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
            password
        )
        VALUES ($1, $2, $3, $4)
        RETURNING id, first_name, last_name, email, password, created_at;
        `, [credentials.firstName, credentials.lastName,lowercasedEmail, hashedPassword])

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

}
